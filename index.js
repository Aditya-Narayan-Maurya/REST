const express =require("express");
const app=express();
const port = 8080;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
const { url } = require("inspector");


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));


let posts=[
    {
        id:uuidv4(),
        username:"AdityaMaurya",
        content: "I Love coading!"
    },
    {
        id:uuidv4(),
        username:"AbhishekMaurya",
        content: "I Love Reading book"
    },
    {
        id:uuidv4(),
        username:"AginkyaMaurya",
        content: "HardWorking is the key of success"
    }
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})
app.post("/posts",(req,res)=>{
    let id=uuidv4(); 
    let {username,content}=req.body;
    posts.push({
        id,username,content
    })
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    console.log(req.params)
    let post=posts.find((p)=> id===p.id);
    res.render("show.ejs",{post})
})
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let newContent=req.body.content;
    let post=posts.find((p)=> id===p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/posts");
})
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("edit.ejs",{post})
   
})
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=> id !==p.id);
    res.redirect("/posts");
})

app.listen(port,()=>{
    console.log(`app is listening port ${port}`);
})
