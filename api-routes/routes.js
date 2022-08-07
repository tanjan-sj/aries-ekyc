const express = require('express');
const router = express.Router();

const axios = require('axios');
const http = require('http');
const QRCode = require('qrcode')

router.post('/hello', async function (req, res, next) {
    const responseBody = {};

    try{
        axios.post('http://localhost:8021/connections/create-invitation')
            .then(response => {
                const invitationUrl = response.data.invitation_url;
                QRCode.toDataURL(invitationUrl, function (err, url) {
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

router.post('/send-offer', async function (req, res, next) {
    const responseBody = {};
    console.log("-----------------------------------------------")
    console.log("req: ", req.body);

    let config = {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    try{
        axios.post('http://localhost:8021/issue-credential/send-offer', JSON.stringify(req.body), config)
            .then(response => {
                //console.log("response: ", response);
                console.log("areh");
                res.status(200).json({status: true});
                // const invitationUrl = response.data.invitation_url;
                // QRCode.toDataURL(invitationUrl, function (err, url) {
                //     responseBody.invitation_url = invitationUrl;
                //     responseBody.invitation_qr = url;
                //     res.status(200).json(responseBody);
                // })
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

// router.post('/send-message', async function (req, res, next) {
//     const responseBody = {};
//     console.log("req: ", req.body);
//     try{
//         //const conn_id = req.body['connection_id'];
//         //console.log("conn_id: ", conn_id);
//         axios.post('http://localhost:8021/connections/b6e6cf16-66ac-441f-b2f3-766887b3b90b/send-message')
//             .then(response => {
//                 console.log("hey");
//                 console.log(response.data);
//                 // const invitationUrl = response.data.invitation_url;
//                 // QRCode.toDataURL(invitationUrl, function (err, url) {
//                 //     //console.log(url);
//                 //     responseBody.invitation_url = invitationUrl;
//                 //     responseBody.invitation_qr = url;
//                 //     res.status(200).json(responseBody);
//                 // })
//             })
//             .catch(error => {
//                 //console.log(error);
//                 res.status(error.statusCode || 500).json({ message: error.message });
//             });
//         res.status(200).json({success: true});
//
//     }catch(error){
//         console.log(error)
//
//         res.status(error.statusCode || 500).json({ message: error.message });
//     }
// });

// /Users/sumayajannat/Library/Application Support/ngrok/ngrok.yml
//ngrok start --all


module.exports = router;