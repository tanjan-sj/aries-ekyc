const express = require('express');

const ariesRouter = require('./api-routes/routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', ariesRouter);
app.post('/webhooks/*', async function (req, res, next) {
    try{
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World\n');
        const conID = req.body['connection_id'];
        console.log(conID);
        const conStatus = req.body['rfc23_state'];
        if(conID){
            if(conStatus === "completed"){
                console.log("Invitation Completed with conID:" + conID)
            }
            console.log("request body: ", req.body);
            if(req.body['state'] === 'credential_acked'){
                console.log("Credential acked...")
            }
            if(req.body['verified'] === 'true'){
                console.log("Credential verified after proof request..:")

                // You can now retrieve the attributes from the proof request via this way.....
                // var base64data = JSON.stringify(req.body['presentation_request_dict']['request_presentations~attach'][0]['data']['base64'])
                // const decodedString = Buffer.from(base64data, "base64");
                // const jsonData = JSON.parse(decodedString.toString());
                // const proofStatus = true
                // const retrievedAttribute = jsonData['requested_attributes']['0_role']['value']
            }
        }
        // res.status(200).json({success: "hello world"});

    }catch(error){
        console.log(error)

        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

module.exports = app;