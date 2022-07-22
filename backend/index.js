const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require('./db/User');
const Show = require("./db/Show")
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-com';
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    Jwt.sign({result}, jwtKey, {expiresIn:"2h"},(err,token)=>{
        if(err){
            resp.send("Something went wrong")  
        }
        resp.send({result,auth:token})
    })
})

app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({user}, jwtKey, {expiresIn:"2h"},(err,token)=>{
                if(err){
                    resp.send("Something went wrong")  
                }
                resp.send({user,auth:token})
            })
        } else {
            resp.send({ result: "No User found" })
        }
    } else {
        resp.send({ result: "No User found" })
    }
});

app.post("/add-show", verifyToken, async (req, resp) => {
    let show = new Show(req.body);
    let result = await show.save();
    resp.send(result);
});

app.get("/shows", verifyToken,async (req, resp) => {
    const shows = await Show.find();
    if (shows.length > 0) {
        resp.send(shows)
    } else {
        resp.send({ result: "No Show found" })
    }
});

app.delete("/show/:id", verifyToken,async (req, resp) => {
    let result = await Show.deleteOne({ _id: req.params.id });
    resp.send(result) 
}),

    app.get("/show/:id", verifyToken, async (req, resp) => {
        let result = await Show.findOne({ _id: req.params.id })
        if (result) {
            resp.send(result)
        } else {
            resp.send({ "result": "No Record Found." })
        }
    })

app.put("/show/:id", verifyToken, async (req, resp) => {
    let result = await Show.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result)
});

app.put("/show/:id", async (req, resp) => {
    let result = await Show.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result)
});

function verifyToken(req,resp,next){
    let token=req.headers['authorization'];
    if(token){
        token=token.split(' ')[1]; 
        Jwt.verify(token,jwtKey,(err,valid)=>{
            if(err){
                resp.status(401).send({result:"Please provide valid token"})
            }else{
                next();
            }
        })
    }else{
        resp.status(403).send({result:"Please add token with header"})
    }
    
}

app.listen(5000);