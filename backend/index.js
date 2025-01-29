const express=require("express");
const app=express();
const mongoose=require("mongoose");
const userRoute=require("./routes/user");
const orderRoute=require("./routes/order");
const productRoute=require("./routes/product");
const authRoute=require("./routes/auth");
const cartRoute=require("./routes/cart");
const stripeRoute=require("./routes/stripe");
const cors=require("cors");



mongoose.connect("mongodb+srv://Dipen:Dipen@niraj.a3bd34h.mongodb.net/shop?retryWrites=true&w=majority&appName=Niraj").then(()=>console.log("DBConnection Succesful")).catch((err)=>{
    console.log(err);
});

app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded requests


app.use(cors());





app.use("/api/user",userRoute);

app.use("/api/auth",authRoute);

app.use("/api/product",productRoute);

app.use("/api/cart",cartRoute);

app.use("/api/order",orderRoute);
app.use("/api/checkout",stripeRoute);







app.listen(5000,()=>{
    console.log("backend is working!!!");
})