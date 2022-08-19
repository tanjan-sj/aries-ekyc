const express = require('express');
const router = express.Router();

const axios = require('axios');
const http = require('http');
const QRCode = require('qrcode')

router.post('/send-invitation', async function (req, res, next) {
    const responseBody = {};

    try{
        axios.post('http://localhost:8021/connections/create-invitation')
            .then(response => {
                const invitationUrl = response.data.invitation_url;
                QRCode.toDataURL(invitationUrl, function (err, url) {
                    responseBody.connection_id = response.data.connection_id;
                    responseBody.invitation_url = invitationUrl;
                    responseBody.invitation_qr = url;
                    res.status(200).json(responseBody);
                })
            })
            .catch(error => {
                console.log(error);
                res.status(error.statusCode || 500).json({ message: error.message });
            });
    }catch(error){
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

router.post('/issue-credential/send-offer', async function (req, res, next) {
    console.log("issue cred api");
    const responseBody = {};

    let config = {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    try{
        axios.post('http://localhost:8021/issue-credential/send-offer', JSON.stringify(req.body), config)
            .then(response => {
                console.log("response: ", response.data);
                responseBody.status = "successfully sent offer";
                responseBody.cred_ex_id = response.data.credential_exchange_id;
                responseBody.state = response.data.state;
                res.status(200).json(responseBody);
            })
            .catch(error => {
                console.log(error);
                res.status(error.statusCode || 500).json({ message: error.message });
            });
    }catch(error){
        console.log("--------------------------------------------------------------------------");
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});


router.get('/issue-credential/cred-def-id', async function (req, res, next) {
    const responseBody = {};
    const schemaName = req.query.schema_name;

    let config = {
        headers: {
            'accept': 'application/json',
        }
    }

    try{
        axios.get('http://localhost:8021/credential-definitions/created', {params: {schema_name: schemaName}}, config)
            .then(response => {
                responseBody.status = "successfully fetched cred_def_id";
                responseBody.credential_definition_id = response.data.credential_definition_ids[0];
                res.status(200).json(responseBody);
            })
            .catch(error => {
                console.log(error);
                res.status(error.statusCode || 500).json({ message: error.message });
            });
    }catch(error){
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

router.get('/issue-credential/check-status', async function (req, res, next) {
    const responseBody = {};
    const schemaName = req.query.cred_ex_id;

    console.log("in issueeee");

    let config = {
        headers: {
            'accept': 'application/json',
        }
    }

    try{
        axios.get('http://localhost:8021/issue-credential/records/' + schemaName, config)
            .then(response => {
                responseBody.state = response.data.state;
                res.status(200).json(responseBody);
            })
            .catch(error => {
                console.log(error);
                res.status(error.statusCode || 500).json({ message: error.message });
            });
    }catch(error){
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});


router.post('/proof/send-request', async function (req, res, next) {
    const responseBody = {};

    let config = {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    try{
        axios.post('http://localhost:8021/present-proof/send-request', JSON.stringify(req.body), config)
            .then(response => {
                //console.log("-------------response for proof request: ----------------", response);
                responseBody.status = "successfully sent proof request";
                responseBody.presentation_exchange_id = response.data.presentation_exchange_id;
                res.status(200).json(responseBody);
            })
            .catch(error => {
                console.log(error);
                res.status(error.statusCode || 500).json({ message: error.message });
            });
    }catch(error){
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

router.get("/proof/check-status", async function(req, res, next){
    const presentation_exchange_id = req.query.pres_ex_id;
    const responseBody = {};

    let config = {
        headers: {
            'accept': 'application/json',
        }
    }

    try{
        axios.get('http://localhost:8021/present-proof/records/'+presentation_exchange_id , config)
            .then(response => {
                responseBody.state = response.data.state;
                //responseBody.data = response.data;
                res.status(200).json(responseBody);
            })
            .catch(error => {
                console.log(error);
                res.status(error.statusCode || 500).json({ message: error.message });
            });
    }catch(error){
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message });
    }

});

module.exports = router;
