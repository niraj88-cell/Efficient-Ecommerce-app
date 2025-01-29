const User = require("../models/User");
const { verifyToken } = require("./VerifyToken");
const bcrypt = require('bcryptjs'); // Ensure bcrypt is imported

const router=require("express").Router();

router.put("/:id",verifyToken,async(req,res)=>{
    if(req.user.id===req.params.id ||req.user.isAdmin){
            let updatedPassword = req.body.password;
            if (updatedPassword) {
            const salt = await bcrypt.genSalt(10);
            updatedPassword = await bcrypt.hash(updatedPassword, salt);
            }

        try{
            const user=await User.findByIdAndUpdate(req.params.id,{
                username:req.body.username,
                email:req.user.email,
                password:updatedPassword
            },{new:true});

            res.status(200).json(user);

        }catch(err){
            res.status(403).json("Failed to update the user!!")
        }

    }else{
        res.status(401).json("You are not allowed!!!")
    }
})


router.delete("/:id",verifyToken,async(req,res)=>{
    if(req.user.id===req.params.id ||req.user.isAdmin){
          
        try{
            const user=await User.findByIdAndDelete(req.params.id
              );

            res.status(200).json("Succesfully Deleted the user");

        }catch(err){
            res.status(403).json("Failed to delete the user!!")
        }

    }else{
        res.status(401).json("You are not allowed!!!")
    }
})



router.get("/find/:id",verifyToken,async(req,res)=>{
    if(req.user.id===req.params.id ||req.user.isAdmin){
     
        try{
            const user=await User.findById(req.params.id
           );

            res.status(200).json(user);

        }catch(err){
            res.status(403).json("Failed me!!")
        }

    }else{
        res.status(401).json("You are not allowed!!!")
    }
})


router.get("/total",verifyToken,async(req,res)=>{
    if(req.user.isAdmin){
     
        try{
            const user=await User.find();

            res.status(200).json(user);

        }catch(err){
            res.status(403).json("Failed to get this user!!")
        }

    }else{
        res.status(401).json("You are not allowed!!!")
    }
})
router.get("/stat", verifyToken, async (req, res) => {
    if (req.user.isAdmin) {
      const date = new Date();
      const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
      try {
        const data = await User.aggregate([
          { $match: { createdAt: { $gte: lastYear } } },
          { $project: { month: { $month: "$createdAt" } } },
          { $group: { _id: "$month", total: { $sum: 1 } } }
        ]);
        res.status(200).json(data);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed to access this resource!");
    }
  });
  
module.exports=router;