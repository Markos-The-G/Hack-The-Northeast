const express = require('express');
const IPFS = require('ipfs-api');
const axios = require('axios');
const ethers = require('ethers');
const { abi, address } = require('../contract');
const router = express.Router();

const URL = 'HTTP://127.0.0.1:7545';
const customHttpProvider = new ethers.providers.JsonRpcProvider(URL);
let Contract = new ethers.Contract(address, abi, customHttpProvider.getSigner(0));

router.post('/', async function (req, res, next) {
    const USER_ADDRESS = req.body.userhash;

    await Contract.statistics(USER_ADDRESS);
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

module.exports = router;