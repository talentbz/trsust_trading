const express = require("express");
const { 
    getUsersForAdmin,
    getUsers,
    Register,
    Login,
    Logout ,
    UpdateUser,
    getMetaAccountsByUserid,
    deleteUser,
} = require("../controllers/Users.js");
const { verifyToken, verifyAdminToken } = require("../middleware/VerifyToken.js");
const { refreshToken } = require("../controllers/RefreshToken.js");
const { getCurrencyInfo } = require("../controllers/MTAPI");

const router = express.Router();

router.post('/login', Login);
router.post('/register', Register);
router.get('/users', verifyToken, getUsers);
router.post('/metaaccounts', verifyToken, getMetaAccountsByUserid);       
router.get('/token', refreshToken);
router.delete('/user/logout', Logout);

//admin functions
router.get('/users_detail', verifyAdminToken, getUsersForAdmin);
router.post('/user/update', verifyAdminToken, UpdateUser);
router.delete('/user/delete', verifyAdminToken, deleteUser);


module.exports = router;