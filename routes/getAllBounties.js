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
                    console.log(uDOC[pTITLE])
                    SUBMISSION = {
                        message: "Project asdasd",
                        name: uDOC[pTITLE].name,
                        user: uDOC[pTITLE].user,
                        description: uDOC[pTITLE].description,
                        requirements: uDOC[pTITLE].requirements,
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

    const LIST = await getAllBounty(USER_ADDRESS);
    const OBJ = {  };

    LIST.forEach(async docTitle => {
        const SUBMISSION = await searchBounty(USER_ADDRESS, docTitle);
        OBJ[SUBMISSION.name] = SUBMISSION;
    })
    
    setTimeout(() => {
        res.send(OBJ);
    }, LIST.length*500);

})

// router.post('/test', async function (req, res, next) {
//     await Contract.addNewBounty(req.body.address, req.body.name, req.body.requirement, req.body.amount)
//     res.send('success');
// })

//
module.exports = router;
