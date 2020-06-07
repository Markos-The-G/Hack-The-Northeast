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

const getAllBounty = async (user) => {
    const IPFS_HASH = await Contract.get();

    const MDB = await get(IPFS_HASH);
    const BOUNTIES = [];
    const USERS = Object.keys(MDB);

    USERS.forEach(uID => {
        if (uID !== user) {
            const uDOC = MDB[uID];
            const USER_PROJECTS = Object.keys(uDOC);

            USER_PROJECTS.forEach(pTITLE => {
                BOUNTIES.push(pTITLE);
            })

        }
    })

    return BOUNTIES; 

}

router.post('/', async function (req, res, next) {
    const USER_ADDRESS = req.body.userhash;

    await Contract.retrieveTempSubmissionArray(USER_ADDRESS);
    Contract.returnTempSubmissionArray().then(async userInfo => {

        const LIST = [  ];

        userInfo.forEach(subDoc => {

            const bountyName = subDoc.bountyName;
            let accuracy = subDoc.accuracy;
            accuracy = parseInt("0x50", 16);

            LIST.push(
                [
                    bountyName, accuracy
                ]
            )

            // [0] is bountyName, [1] is accuracy
        })

        Contract.deleteTempSubmissionArray();
        res.send(LIST); //3 values (address, accuracy, name of bounty) all seperated by 1 comma (string). Do with the results as you wish before you send it ....
        
    })

})

// router.post('/test', async function (req, res, next) {
//     await Contract.addNewBounty(req.body.address, req.body.name, req.body.requirement, req.body.amount)
//     res.send('success');
// })

//
module.exports = router;
