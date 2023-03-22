const jwt = require("jsonwebtoken")
const model = require("../model/user")
const User = model.user
exports.createUser = (req,res) =>{
    var token = jwt.sign({ email: req.body.email }, 'shhhhh');
    const user = new User({...req.body, token:token})
    user.save((err,doc)=>{
      if(err){
        res.status(400).json(err)
      }else{  
        res.status(201).json(doc)
      }
    })
  }