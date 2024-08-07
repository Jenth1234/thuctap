const express = require("express");
const router = express.Router();
const user_controller = require('../../controllers/user/user.controller');
const {verifyToken, verifyTokenAdmin} = require("../../middleware/verifyToken");


router.post('/approvedOrganizations', verifyTokenAdmin, user_controller.approvedOrganizations);
router.post('/activeOrganization', verifyTokenAdmin, user_controller.activeOrganization);
router.post('/blockUser', verifyTokenAdmin, user_controller.blockUser);

router.post('/forgotPassword', user_controller.forgotPassword);
router.post('/resendOTP', user_controller.ResendOTP);

router.post('/verifyOTPAndActivateUser', user_controller.verifyOTPAndActivateUser);

router.post('/resetPassword', user_controller.resetPassword);
router.put('/updateUser', verifyToken, user_controller.updateUser);
router.get('/searchUser', verifyToken, user_controller.search);
router.get('/getUsers',verifyToken,user_controller.getUsers);

router.get('/totalUser',verifyToken,user_controller.getTotalUsers);
// router.post('/checkUsernameExists',verifyToken,user_controller.checkUsernameExists);
router.get('/getDashboardData',verifyToken,user_controller.getDashboardData);
router.get('/info',verifyToken,user_controller.getUserInfo);
router.post("/register", user_controller.registerUser);
router.post("/loginUser", user_controller.login);
router.post('/resendOTP', user_controller.ResendOTP);





// router.get('/organization', verifyToken.checkOrganization,user_controller.login);

module.exports = router;