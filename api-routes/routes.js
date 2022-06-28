const express = require('express');
const router = express.Router();

router.get('/hello', async function (req, res, next) {
    try{
        res.status(200).json({success: "hello world"});
    }catch(error){
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

module.exports = router;