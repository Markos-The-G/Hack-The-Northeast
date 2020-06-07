const express = require('express');
const ethers = require('ethers');
const { abi, address } = require('../contract');

const URL = 'HTTP://127.0.0.1:7545';
const customHttpProvider = new ethers.providers.JsonRpcProvider(URL);
let Contract = new ethers.Contract(address, abi, customHttpProvider.getSigner(0));

const router = express.Router();

router.post('/', async (req, res, next) => {
    const BOUNTY_NAME = req.body.bountyName;

    

    const LIST = await Contract.retreieveTempBountyArray(); // req.body.bountyName


    Contract.returnTempBountyArray().then( async LIST => {
        LIST.forEach(async doc => {
            if (doc.name === BOUNTY_NAME) {
                await Contract.deleteTempBountyArray();
                res.send(doc.bountyAmount["_hex"]);
            }

        })

        // LIST[0].forEach()

        // let ABORT = false;
        // let MONEY = null;

        // // console.log(LIST);

        // LIST[0].forEach(bounty => {
        //     console.log(bounty);
        //     // if (!ABORT) {
        //     //     let VALUE = bounty[2]["_hex"];
        //     //     console.log(bounty);
        //     //     VALUE = parseInt(VALUE, 16);

        //     //     if (bounty[0] === BOUNTY_NAME) {
        //     //         ABORT = true;
        //     //         MONEY = VALUE;
        //     //     }
        //     // }

        // })
        
        // res.send(`${MONEY}`);

    })
})


module.exports = router;
