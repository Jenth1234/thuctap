const express = require('express');
const router = express.Router();
const InvoiceController = require('../../controllers/invoice/invoice.controller');
const {verifyToken, verifyTokenAdmin} = require("../../middleware/verifyToken");
const axios = require('axios');
const crypto = require("crypto");

router.post('/getInvoicebyOrgan', verifyToken, InvoiceController.getInvoicesByOrganization);
router.post('/buy',verifyToken,InvoiceController.buyPackage);
router.post('/ipn',InvoiceController.handleIPN);
router.post('/callback',async(req,res)=>{

    console.log('Thanh toán hoàn tất');
    console.log(req.body);
     return res.status(200).json(req.body);
})
// router.get('/packageO', InvoiceController.getOP);
module.exports = router;
