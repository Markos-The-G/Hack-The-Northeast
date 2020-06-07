const express = require('express');
const IPFS = require('ipfs-api');
const axios = require('axios');
const ethers = require('ethers');
const { abi, address } = require('../contract');

const URL = 'HTTP://127.0.0.1:7545';
const customHttpProvider = new ethers.providers.JsonRpcProvider(URL);
let Contract = new ethers.Contract(address, abi, customHttpProvider.getSigner(0));

const ipfs = new IPFS ({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https'
})

const get = async hash => {
    const URL = "https://gateway.ipfs.io/ipfs/" + hash;

    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

const uploadFile = async (buffer) => {
    return new Promise((resolve, reject) => {
        ipfs.files.add(buffer, async (err, res) => {
            if (err) {
                console.error(err);
            } else {
                const HASH = await res[0].hash;
                resolve(HASH);
            }
        })
    })
}

const updateModel = async (title, accuracy, bufferedModel) => {


    return new Promise( async (resolve, reject) => {

        // const IPFS_HASH = await Contract.get();
        const IPFS_HASH = 'Qma2DmcFktqnrGByJkMu4PbVBFh7pGtEBfGQrAVqp7ME56';
        const MDB = await get(IPFS_HASH);
        const USERS = Object.keys(MDB);

        bufferedModel = Buffer.from(bufferedModel);
        const modelHash = await uploadFile(bufferedModel);
        let ABORT = false;

        USERS.forEach(uID => {
            // if (uID !== user) {
            if (!ABORT) {
                const uDOC = MDB[uID];
                const USER_PROJECTS = Object.keys(uDOC);

                USER_PROJECTS.forEach(pTITLE => {
                    if (pTITLE === title && !ABORT) {
                        ABORT = true;
                        MDB[uID][pTITLE] = {
                            name: MDB[uID][pTITLE].name,
                            description: MDB[uID][pTITLE].description,
                            requirements: {
                                accuracy
                            },
                            trainingDataHash: MDB[uID][pTITLE].trainingDataHash,
                            modelHash: modelHash
                        }

                    }
                })

            }
        })

        let buffer = Buffer.from(JSON.stringify(MDB));

        const HASH = await uploadFile(buffer);
        
        resolve(HASH);
    })


}

const router = express.Router();

router.post('/', async function (req, res, next) {
    const USER_ADDRESS = req.body.userhash;
    const LIST = [  ];
    await Contract.retrieveTempSubmissionArray(USER_ADDRESS);
    Contract.returnTempSubmissionArray().then(async userInfo => {

        userInfo.forEach(subDoc => {
            let accuracy = subDoc.accuracy;
            accuracy = parseInt("0x50", 16);

            LIST.push( accuracy )

        })
        LIST.sort();
        console.log(LIST);
        Contract.deleteTempSubmissionArray();

        if (req.body.accuracy > LIST[LIST.length - 1] && req.body.accuracy < req.body.bountyAccuracy) {
            await partialPayment(req.body.userhash, req.body.amount, req.body.bountyAddress);
            res.send('Partial Payment');
        } else if (req.body.accuracy >= req.body.bountyAccuracy) {
            await Contract.fullPayment(req.body.userhash, req.body.bountyAddress)
            res.send('Full Payment');
        } else {
            res.send('No Payment');
        }

        
    })


    // updateModel(title, accuracy, bufferedModel)

})

// router.post('/test', async function (req, res, next) {
//     await Contract.addNewBounty(req.body.address, req.body.name, req.body.requirement, req.body.amount)
//     res.send('success');
// })

//

// 1. Submitting =. 2. If the accuracy of submission is > the highest accuracy submission => Swap the models, continue the endpoint which pay x amount 3. Call add submission
module.exports = router;
