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

const router = express.Router();

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

const updateModel = async (title, accuracy, bufferedModel, result) => {


    return new Promise( async (resolve, reject) => {
        const IPFS_HASH = await Contract.get();
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
                            modelHash: modelHash,
                            paid: result
                        }

                    }
                })

            }
        })

        let buffer = Buffer.from(JSON.stringify(MDB));

        const HASH = await uploadFile(buffer);
        await Contract.set(HASH);
        resolve(HASH);
    })


}

router.post('/', async function (req, res, next) {
    const TITLE = req.body.title;
    const ACCURACY = req.body.accuracy;
    const BUFFERED_MODEL = req.body.model;
    const RESULT = req.body.status; // boolean

    updateModel(TITLE, ACCURACY, BUFFERED_MODEL, RESULT).then(HASH => {
        res.send("Updated");
    })
    

})

module.exports = router;