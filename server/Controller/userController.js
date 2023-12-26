const userModel = require('../Models/userModels');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const CreateToken = (_id) =>{
    const jwtkey = process.env.JWT_SECRATE_KEY;
    return jwt.sign({_id},jwtkey,{expiresIn:'3d'})
}


// create user function
const registerUser = async (req, res) =>{
    try{
        const {name,email,password} = req.body;
        
        if(!name || !email || !password)
        {
            return (
                res.status(400).json('All fields are required...')
            );

        }
        let user = await userModel.findOne({email});
        if(user) 
        { 
            return (
                res.status(400).json('User with this given email already exist....')
                );
        }
        if(!validator.isEmail(email))
        {
            // console.log(validator.isEmail(email));
            return(
                res.status(400).json(`Enter a valid email...${email}`)
            );

        }
        if(!validator.isStrongPassword(password))
        {
            return(
                res.status(400).json('Enter a strong password...')
            );

        }
        user = new userModel({name,email,password})
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password,salt);
        await user.save();
        const token = CreateToken(user._id);
        res.status(200).json({_id:user._id,name,email,token});
    }
    catch(error){
        // console.log(error);
        res.status(500).json(error);
    }
    
}

// login user function
const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try
    {
        if( !email || !password)
        {
            return (
                res.status(400).json('All fields are required...')
            );

        }
        let user = await userModel.findOne({email});
        if(!user){
            return(
                res.status(400).json("Invalid email or password")
            );
        }
        const isValidPassword = await bcrypt.compare(password,user.password);
        if(!isValidPassword){
            return(
                res.status(400).json("Invalid email or password")
            );
        }
        const token = CreateToken(user._id);
        res.status(200).json({_id:user._id,name:user.name,email,token});
    }
    catch(error){
        res.status(500).json(`Internal Server Error : ${error}`);
    }
}

// find user by id
const FindUser = async(req,res) =>{
    const userId = req.params.userId;
    try{
        const user = await userModel.findById(userId);

        res.status(200).json(user);

    }
    catch(error)
    {
        res.status(500).json(`Internal Server Error : ${error}`);

    }
}

//get all user
const GetUsers = async(req,res) =>{
    try{
        const users = await userModel.find();

        res.status(200).json(users);

    }
    catch(error)
    {
        res.status(500).json(`Internal Server Error : ${error}`);

    }
}

module.exports = {registerUser,loginUser,FindUser,GetUsers}