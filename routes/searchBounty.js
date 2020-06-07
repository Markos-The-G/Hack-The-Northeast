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

const searchBounty = async (user, title) => {
    const IPFS_HASH = await Contract.get();

    const MDB = await get(IPFS_HASH);
    const USERS = Object.keys(MDB);
    let SUBMISSION = {
        message: "Project not found"
    };
    let ABORT = false;

    USERS.forEach(uID => {
        // if (uID !== user && !ABORT) {
        if (!ABORT) {
            const uDOC = MDB[uID];
            const USER_PROJECTS = Object.keys(uDOC);

            USER_PROJECTS.forEach(pTITLE => {
                if (pTITLE === title && !ABORT) {
                    ABORT = true;
                    const trainingDataLink = 'https://ipfs.io/ipfs/' + uDOC[pTITLE].trainingDataHash;
                    const modelLink = 'https://ipfs.io/ipfs/' + uDOC[pTITLE].modelHash;
                    SUBMISSION = {
                        message: "Project found",
                        name: uDOC[pTITLE].name,
                        description: uDOC[pTITLE].description,
                        requirements: uDOC[pTITLE].requirements,
                        user: uDOC[pTITLE].user,
                        paid: uDOC[pTITLE].paid,
                        trainingDataLink,
                        modelLink
                    }
                }
            })

        }
    })

    return SUBMISSION;

}

router.post('/', async function (req, res, next) {
    const USER_ADDRESS = req.body.userhash;
    const NAME = req.body.name;

    const SUBMISSION = await searchBounty(USER_ADDRESS, NAME);
    res.send(SUBMISSION);

})

module.exports = router;