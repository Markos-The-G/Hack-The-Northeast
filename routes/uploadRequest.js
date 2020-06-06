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
                resolve(hash);
            }
        })
    })
}

const uploadRequest = async (user, name, description, requirements, bufferTrainingData, bufferModel) => {
    const IPFS_HASH = await Contract.get();
    console.log(IPFS_HASH);
    if (IPFS_HASH == "QmbJWAESqCsf4RFCqEY7jecCashj8usXiyDNfKtZCwwzGb") { // Empty File
        console.log("orig")
        let OBJ = {};
        uploadFile(bufferTrainingData).then(trainingDataHash => {

            uploadFile(bufferModel).then(modelHash => {
                OBJ[user] = {
                    name,
                    description,
                    requirements,
                    trainingData: trainingDataHash,
                    model: modelHash
                }

                let buffer = Buffer.from(JSON.stringify(OBJ));

                return new Promise((resolve, reject) => {
                    ipfs.files.add(buffer, async (err, res) => {
                        if (err) {
                            console.error(err);
                        } else {
                            const hash = await res[0].hash;
                            await Contract.set(hash);

                            resolve(res);
                        }
                    })
                })

            })

        })

    } else {
        const MDB = await get(IPFS_HASH);

        uploadFile(bufferTrainingData)

    }

}

router.post('/', async function (req, res, next) {
    const USER_HASH = req.body.userhash;
    const NAME = req.body.name;
    const DESCRIPTION = req.body.description;
    const REQUIREMENTS = req.body.requirements;
    const BUFFER_TRAINING_DATA = req.body.trainingdata;
    const BUFFER_MODEL = req.body.model;

    uploadRequest(USER_HASH, NAME, DESCRIPTION, REQUIREMENTS, BUFFER_TRAINING_DATA, BUFFER_MODEL).then(hash => {
        res.send(`${hash}`);
    })

})

module.exports = router;