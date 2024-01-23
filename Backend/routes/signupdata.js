const express=require('express');
const path = require('path');
const router=express.Router()
const signdata=require('../model/register');
router.use(express.json());
router.use(express.urlencoded({extended:true}))
const jwt = require('jsonwebtoken');



function verifytoken(req,res,next){
  try{
    const token= req.headers.token;
    console.log(token);
    if(!token) throw 'Unauthorized';
    let payload=jwt.verify(token,'reactblogapp');
    if(!payload) throw 'Unauthorized';
    //res.staus(200).send(payload);
    next();

  }catch(error){
    res.status(401).send(error);
  }
}

//CRUD for Signup data


  router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const foundUser = await signdata.findOne({ email, password });

        if (foundUser) {
           let payload ={email:email,password:password};
           let token = jwt.sign(payload,'reactblogapp');

            res.status(200).send({message:'success',token:token});
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send(error);
    }
});






  
router.post('/blogdata', async (req, res) => {
    const data = new signdata({
         name: req.body.name,
        email: req.body.email,
        address :req.body.address,
        phonenumber :req.body.phonenumber,
        password:req.body.password
    })
  
    try {
        const dataToSave = await data.save();
        res.status(200).send("Posted Successfully")
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
  })
  
 
  router.put("/blogdata/:id", async (req, res) => {
  try {
    const id = req.params.id;
  const updateddata = req.body;
  const result = await signdata.findByIdAndUpdate(id, updateddata);
   
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.delete('/blogdata/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const data = await signdata.findByIdAndDelete(id);
      res.json(`Document with ${data.name} has been deleted..`);
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})



module.exports=router;