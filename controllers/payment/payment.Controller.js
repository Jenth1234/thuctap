const express = require("express");
const axios = require("axios");
const crypto = require("crypto");

const sendPaymentRequest = async (req, res) => {
    const requestData = req.body;
    const accessKey = "F8BBA842ECF85";
    const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    const orderInfo = "pay with MoMo";
    const partnerCode = "MOMO";
    const redirectUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
    const ipnUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
    const requestType = "payWithMethod";
    const amount = "20000";
    const orderId = partnerCode + Date.now().toString();

    const requestId = orderId;
    const extraData = "";
    const orderGroupId = "";
    const autoCapture = true;
    const lang = "vi";

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    
    const signature = crypto.createHmac("sha256", secretKey).update(rawSignature).digest("hex");

    const requestBody = {
        partnerCode: partnerCode,
        partnerName: "Test",
        storeId: "MomoTestStore",
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData: extraData,
        orderGroupId: orderGroupId,
        signature: signature
    };

    try {
        const response = await axios.post("https://test-payment.momo.vn/v2/gateway/api/create", requestBody);
        return res.status(200).json(response.data);
    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).json({
                statusCode: error.response.status,
                message: error.response.data
            });
        } else if (error.request) {
            return res.status(500).json({
                statusCode: 500,
                message: "No response received from server"
            });
        } else {
            return res.status(500).json({
                statusCode: 500,
                message: "An unexpected error occurred"
            });
        }
    }
};


module.exports = {sendPaymentRequest};
