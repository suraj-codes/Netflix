const express = require("express")
const app = express()
const bcrypt = require("bcryptjs")
const port = process.env.PORT||8000;
require("./db/conn")
const User = require("./db/schema/schema")
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const cors = require("cors");
app.use(express.json());

app.get("/",(req,res)=>{ 
    res.send("Hiii")
})
app.post("/user",async(req,res)=>{
    const email = req.body.email
    const user = await User.findOne({email})
    if(user){
        res.send("User Already Exist")
    }
    else{
        const password = await bcrypt.hash(req.body.password,12)
        const subscription = req.body.subscription
        const userreg = new User({
        email,
        password,
        subscription,
    })
    const resp = await userreg.save()
    
    res.send(resp)
    }
    

})
app.get("/user",async(req,res)=>{
    const password = req.query.loginpassword
    const email = req.query.loginemail
    const user = await User.findOne({email})
    if(user){
        const match =await bcrypt.compare(password,user.password)
        if(match){
            res.send(user)
        }
        else{
            res.send("Invalid password");
        }
    }
    else{
        res.send("user not found");
    }

})

app.post("/stripe/charge",cors(), async (req, res) => {
    let { plan,email,amount, id } = req.body;
    try {
      const payment = await stripe.paymentIntents.create({
        amount: amount,
        currency: "INR",
        description: "Your Company Description",
        payment_method: id,
        confirm: true,
      });
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 2).padStart(2, '0'); //January is 0!    
      var yyyy = today.getFullYear();
      
      today = dd + '/' + mm + '/' + yyyy;
      await User.updateOne({email}, { $set: {subscription: {plan,expires:today} } })
      const data = await User.findOne({email})
      res.send(data);
    } catch (error) {
      console.log(error);
      res.json({
        message: "Payment Failed",
        success: false,
      });
    }
  });


  if(process.env.NODE_ENV==="production"){
    app.use(express.static("client/build"))
}

app.listen(port,()=>{
    console.log(`Listening at : ${port}`)
})