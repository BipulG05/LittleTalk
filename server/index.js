const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./Routes/userRoutes');
const chatRoute = require('./Routes/chatRoutes');
const messageRoute = require('./Routes/messageRoutes');



require('dotenv').config();

const app = express();


app.use(express.json());
app.use(cors());
app.use('/api/users',userRoute);
app.use('/api/chats',chatRoute);
app.use('/api/messages',messageRoute);


app.get("/",(req,res)=>{
    res.send("Welcome from LittleTalk");
}) 



// const uri = process.env.ATLAS_URL|| 'mongodb://localhost:27017/LittleTalk';
const uri = process.env.LOCAL_URL2 || process.env.LOCAL_URL1;


// mongoose.connect(uri, {
//     useNewUrlParser: true, // Optional: May not be necessary depending on your Node.js version and Mongoose version
//     useUnifiedTopology: true, // Optional: May not be necessary depending on your Node.js version and Mongoose version
// }).then(() => {
//     console.log("MongoDB Connection Established");
// }).catch((error) => {
//     console.error("MongoDB connection error:", error.message);
// });

mongoose.connect(uri).then(() => {
    console.log("MongoDB Connection Established");
}).catch((error) => {
    console.error("MongoDB connection error:", error.message);
});

// mongoose.connect(uri, {
//     useNewUrlParser: true, // You can still keep this option if needed
//     useUnifiedTopology: true, // Remove this as it's deprecated
// }).then(() => {
//     console.log("MongoDB Connection Established");
// }).catch((error) => {
//     console.error("MongoDB connection error:", error.message);
// });
// mongoose.connect(uri,{
//     // useNewUrlParser:true,
//     useUnifiedTopology:true,

// }).then(()=>console.log("Mongodb Connecion Established")).catch((error)=>console.log("mongodb connection field",error.message));


// Example server running on port 5000
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
// const port = process.env.PORT || 5000;
// app.listen(port, (req, res)=>{
//     console.log(`server running on port : ${port}`);
// })
 
 