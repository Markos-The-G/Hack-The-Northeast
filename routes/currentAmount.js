const express = require('express');
const ethers = require('ethers');
const { abi, address } = require('../contract');

const URL = 'HTTP://127.0.0.1:7545';
const customHttpProvider = new ethers.providers.JsonRpcProvider(URL);
let Contract = new ethers.Contract(address, abi, customHttpProvider.getSigner(0));

const router = express.Router();

router.post('/', async (req, res, next) => {
    const BOUNTY_NAME = req.body.bountyName;

    Contract.retreieveTempBountyArray();

    // const LIST = await returnTempBountyArray(); // req.body.bountyName


    Contract.returnTempBountyArray().then(LIST => {

        let ABORT = false;
        let MONEY = null;

        LIST[0].forEach(bounty => {
            if (!ABORT) {
                let VALUE = bounty[2]["_hex"];
                VALUE = parseInt(VALUE, 16);

                if (bounty[0] === BOUNTY_NAME) {
                    ABORT = true;
                    MONEY = VALUE;
                }
            }

        })
        
        Contract.deleteTempBountyArray();
        res.send(`${MONEY}`);

    })
})


module.exports = router;
