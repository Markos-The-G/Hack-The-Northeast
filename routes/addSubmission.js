const express = require('express');
const ethers = require('ethers');
const { abi, address } = require('../contract');

const URL = 'HTTP://127.0.0.1:7545';
const customHttpProvider = new ethers.providers.JsonRpcProvider(URL);
let Contract = new ethers.Contract(address, abi, customHttpProvider.getSigner(0));

const router = express.Router();

router.post('/', async (req, res, next) => {
    await Contract.addNewSubmission(req.body.accuracy, req.body.submitterAddress, req.body.bountyCreatorAddress);
    res.send('true');
})


module.exports = router;
