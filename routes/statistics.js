const express = require('express');
const IPFS = require('ipfs-api');
const axios = require('axios');
const ethers = require('ethers');
const { abi, address } = require('../contract');
const router = express.Router();

const URL = 'HTTP://127.0.0.1:7545';
const customHttpProvider = new ethers.providers.JsonRpcProvider(URL);
let Contract = new ethers.Contract(address, abi, customHttpProvider.getSigner(0));

// router.post('/', async function (req, res, next) {
//     const USER_ADDRESS = req.body.userhash;

//     await Contract.statistics(USER_ADDRESS);
//     Contract.returnTempSubmissionArray().then(userInfo => {
//         console.log(userInfo);
//         const LIST = [  ];

//         userInfo.forEach(subDoc => {

//             const bountyName = subDoc.bountyName;
//             let accuracy = subDoc.accuracy;
//             accuracy = parseInt(accuracy, 16);

//             LIST.push(
//                 [
//                     bountyName, accuracy
//                 ]
//             )

//             // [0] is bountyName, [1] is accuracy
//         })

//         await Contract.deleteTempSubmissionArray();
//         res.send(LIST); //3 values (address, accuracy, name of bounty) all seperated by 1 comma (string). Do with the results as you wish before you send it ....

//     })

// })


router.post('/', async (req, res, next) => {
    const USER_ADDRESS = req.body.userhash;

    // await Contract.deleteTempSubmissionArray();
    const ADDRESS_LIST = await Contract.returnBountyAddresses();

    await Contract.statistics(USER_ADDRESS);
    const SUBMISSION_ARRAY = await Contract.returnTempSubmissionArray();

    // 0x5f6deEf5aD5543098169c08486cdDBFE9b9D24bb
    await Contract.deleteTempSubmissionArray();
    res.send(SUBMISSION_ARRAY);

})

module.exports = router;