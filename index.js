require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const server = express();
const path = require('path');
const jwt = require("jsonwebtoken")
const productRouter = require('./routes/product')
const userRouter = require('./routes/user')
const authRouter = require("./routes/authRouter")
//db connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('database connected')
}
//Schema


const auth = (req,res,next) =>{
  try{
    const token = req.get("Authorization").split(" ")[1]
    console.log(token)
    var decoded = jwt.verify(token, 'shhhhh');
    if(decoded.email){
      next()
    }else{
      res.sendStatus(401)
    }
  }catch(err){
    res.sendStatus(401)
  }
}







//bodyParser
server.use(auth)
server.use(cors());
server.use(express.json());
server.use(express.urlencoded());
server.use(morgan('default'));
server.use(express.static(path.resolve(__dirname,process.env.PUBLIC_DIR)));
server.use("/auth", authRouter.router)
server.use('/products',auth,productRouter.router);
server.use('/users',auth,userRouter.router);
server.use('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'build','index.html'))
})




server.listen(process.env.PORT, () => {
  console.log('server started');
});
module.export = server