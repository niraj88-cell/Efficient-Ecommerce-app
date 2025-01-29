const Cart = require("../models/Cart");
const { verifyToken } = require("./VerifyToken");

const router=require("express").Router();

router.post("/",verifyToken,async(req,res)=>{

    if(req.user.id===req.params.id ||req.user.isAdmin){

        const newCart=new Cart(req.body);

        try{

            const savedCart=await newCart.save();

            res.status(200).json(savedCart);

        }catch(err){
            res.status(500).json(err);
        }



    }

})


router.put("/:id",verifyToken,async(req,res)=>{
    if(req.user.id===req.params.id ||req.user.isAdmin){
      

        try{
            const cart=await Cart.findByIdAndUpdate(req.params.id,req.body,{new:true});

            res.status(200).json(cart);

        }catch(err){
            res.status(403).json("Failed to update the Cart!!")
        }

    }else{
        res.status(401).json("You are not allowed!!!")
    }
})


router.delete("/:id",verifyToken,async(req,res)=>{
    if(req.user.id===req.params.id ||req.user.isAdmin){
          
        try{
          await Cart.findByIdAndDelete(req.params.id
              );

            res.status(200).json("Succesfully Deleted the Cart");

        }catch(err){
            res.status(403).json("Failed to delete the Cart!!")
        }

    }else{
        res.status(401).json("You are not allowed!!!")
    }
})



router.get("/find/:id",verifyToken,async(req,res)=>{
    if(req.user.id===req.params.id ||req.user.isAdmin){
     
        try{
            const cart=await Cart.findbyId(req.params.id
           );

            res.status(200).json(cart);

        }catch(err){
            res.status(403).json("Failed to get the cart!!")
        }

    }else{
        res.status(401).json("You are not allowed!!!")
    }
})


router.get("/find/all",verifyToken,async(req,res)=>{
    if(req.user.id===req.user.isAdmin){
     
        try{
            const carts=await Cart.find(
           );

            res.status(200).json(carts);

        }catch(err){
            res.status(403).json("Failed to get the cart!!")
        }

    }else{
        res.status(401).json("You are not allowed!!!")
    }
})








module.exports=router;