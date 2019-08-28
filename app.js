//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeS = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));//STATIC FILES LIKE CSS IS IN PUBLIC FOLDER
//yupp

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});


const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/",function(req,res)
{

    res.sendFile(__dirname +"/views/about.html");

});
app.get("/home", function(req, res){

Post.find({}, function(err, posts){
    res.render("home", {
      h: homeS,
      posts: posts
      });
  });
});


app.get("/compose",function(req,res)
{
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.pt,
    content: req.body.pb
  });
  post.save(function(err){
      if (!err){
          res.redirect("/home");
      }
    });
  });
//app.post("/about.html",function(req,res)
//{
//res.sendFile(__dirname +"/views/login.html");
//});

app.get("/login",function(req,res)
{
  res.sendFile(__dirname +"/views/login.html");
//  res.render("login");
});

app.post("/login",function(req,res)
{
  const info ={
    name:req.body.name,
    email:req.body.em,
    password:req.body.pass
  };
//  myFunction();
//  alert("Hello, "+info.name+"."+"Welcome to your Daily Journal");
  res.redirect("/compose");
});

app.get("/post/:postname",function(req,res)
{
  const t = _.lowerCase(req.params.postname);  ///i hv used lodash here.
  posts.forEach(function(post)
{ const stored = _.lowerCase(post.title);
  if(t===stored)
res.render("post",{
  composedtitle:post.title,
  composedcontent:post.content
});
});

});
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
