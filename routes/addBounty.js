const express = require('express');
const IPFS = require('ipfs-api');
const axios = require('axios');
const ethers = require('ethers');
const { abi, address } = require('../contract');
var cors = require('cors')

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

const uploadRequest = async (user, name, description, requirements, bufferTrainingData, bufferModel) => {
    const IPFS_HASH = await Contract.get();

    bufferTrainingData = Buffer.from(bufferTrainingData);
    bufferModel = Buffer.from(bufferModel);

    if (IPFS_HASH == "QmbJWAESqCsf4RFCqEY7jecCashj8usXiyDNfKtZCwwzGb") { // Empty File
        let OBJ = {};

        return new Promise( async (resolve, reject) => {
            const trainingDataHash = await uploadFile(bufferTrainingData);
            const modelHash = await uploadFile(bufferModel);

            OBJ[user] = {  };
            OBJ[user][name] = {
                user,
                name,
                description,
                requirements,
                trainingDataHash,
                modelHash,
                paid: false

            };
            
            let buffer = Buffer.from(JSON.stringify(OBJ));

            const HASH = await uploadFile(buffer);
            await Contract.set(HASH);
            resolve(HASH);

        })

    } else {

        return new Promise( async (resolve, reject) => {
            const MDB = await get(IPFS_HASH);
            const trainingDataHash = await uploadFile(bufferTrainingData);
            const modelHash = await uploadFile(bufferModel);

            if (MDB[user]) {
                MDB[user][name] = {
                    user,
                    name,
                    description,
                    requirements,
                    trainingDataHash,
                    modelHash,
                    paid: false
                    
                };
                
            } else {
                MDB[user] = {  };
                MDB[user][name] = {
                    user,
                    name,
                    description,
                    requirements,
                    trainingDataHash,
                    modelHash,
                    paid: false
                };
                
            }

            let buffer = Buffer.from(JSON.stringify(MDB));

            const HASH = await uploadFile(buffer);
            await Contract.set(HASH);

            resolve(HASH);
        })

    }

}

const checkUser = (activeBounties, user) => {
    const idx = activeBounties.indexOf(user);
    if (idx > -1) {
        return false;
    } else {
        return true;
    }
}

router.post('/', cors(), async function (req, res, next) {
    const USER_HASH = req.body.userhash;
    const NAME = req.body.name;
    const DESCRIPTION = req.body.description;
    const REQUIREMENTS = req.body.requirements;
    const BUFFER_TRAINING_DATA = req.body.trainingdata;
    const BUFFER_MODEL = req.body.model;
    const AMOUNT = req.body.amount;
    const ACTIVE_BOUNTIES = await Contract.returnBountyAddresses();

    const userStatus = checkUser(ACTIVE_BOUNTIES, USER_HASH);
    if (userStatus) {
        uploadRequest(USER_HASH, NAME, DESCRIPTION, REQUIREMENTS, BUFFER_TRAINING_DATA, BUFFER_MODEL).then(async HASH => {
            await Contract.addNewBounty(USER_HASH, NAME, REQUIREMENTS.accuracy, AMOUNT);
            res.send('success');
        })
    } else {
        res.send('unauthorized');
    }

})

module.exports = router;