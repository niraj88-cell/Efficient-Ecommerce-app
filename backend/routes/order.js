const Order = require("../models/Order");
const { verifyToken } = require("./VerifyToken");

const router=require("express").Router();

router.post("/", verifyToken, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        const newOrder = new Order(req.body);
        try {
            const savedOrder = await newOrder.save();
            res.status(200).json(savedOrder);
        } catch (err) {
            res.status(500).json(err);  // Properly handle any errors
        }
    } else {
        return res.status(403).json("You are not allowed to create an order");  // Handle unauthorized case
    }
});



router.post("/:id",verifyToken,async(req,res)=>{

    if(req.user.isAdmin){

 

        try{

            const updatedOrder=await Order.findByIdAndUpdate(req.params.id,req.body,{new:true});

            res.status(200).json(updatedOrder);

        }catch(err){
            res.status(500).json(err);
        }



    }

})


router.delete("/:id",verifyToken,async(req,res)=>{

    if(req.user.id===req.params.id ||req.user.isAdmin){

 

        try{

          await Order.findByIdAndDelete(req.params.id);

            res.status(200).json("Order Deleted Successfully!!!!");

        }catch(err){
            res.status(500).json(err);
        }



    }

})


router.get("/find/:id",verifyToken,async(req,res)=>{

    if(req.user.id===req.params.id ||req.user.isAdmin){

 

        try{

            const getOrder=await Order.findById(req.params.id);

            res.status(200).json(getOrder);

        }catch(err){
            res.status(500).json(err);
        }



    }

})


router.get("/find", verifyToken, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const orders = await Order.find();
            res.status(200).json(orders);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You are not allowed to view this data");
    }
});


// GET INCOME (admin only)
router.get("/income", verifyToken, async (req, res) => {
    if (req.user.isAdmin) {
        const today = new Date();
const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
const previousMonth = new Date(new Date().setMonth(today.getMonth() - 2));

        try {
            const income = await Order.aggregate([
                { $match: { createdAt: { $gte: previousMonth } } },
                {
                    $project: {
                        month: { $month: "$createdAt" },
                        sales: "$amount",
                    },
                },
                {
                    $group: {
                        _id: "$month",
                        total: { $sum: "$sales" },
                    },
                },
            ]);
            res.status(200).json(income);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You are not allowed to view this data");
    }
});



module.exports=router;