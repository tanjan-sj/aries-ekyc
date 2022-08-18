const express = require('express');

const ariesRouter = require('./api-routes/routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', ariesRouter);
app.post('/webhooks/*', async function (req, res, next) {
    try{
        const offerRelatedState = ['offer_sent', 'request_received', 'credential_issued', 'credential_acked'];
        const proofRequestRelatedState = ['request_sent', 'presentation_received', 'verified'];

        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World\n');

        const conID = req.body['connection_id'];
        const conStatus = req.body['rfc23_state'];
        const requestState = req.body['state'] || '';
        if(conID){
            if(conStatus === "completed"){
                console.log("Invitation Completed with conID:" + conID)
            }
            if(offerRelatedState.includes(requestState)){
                //TODO message queue
                console.log(requestState);
            }
            if(req.body['verified'] === 'true'){
                console.log("Credential verified after proof request..:")
            }
        }

    }catch(error){
        console.log(error)

        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

module.exports = app;
