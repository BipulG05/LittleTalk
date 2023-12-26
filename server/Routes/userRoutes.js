const express = require('express');
const {registerUser,loginUser,FindUser,GetUsers} = require('../Controller/userController'); 



const router = express.Router()

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/find/:userId',FindUser);
router.get('/all/users/',GetUsers);

module.exports = router;