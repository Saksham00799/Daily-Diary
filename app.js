//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var posts=[];

app.get(['/home','/'],(req,res)=>{
  res.render('home',{pageHead:'Home',
  pageContent:homeStartingContent,
  posts:posts
  });
});

app.get('/about',(req,res)=>{
  res.render('about',{pageHead:'About',pageContent:aboutContent});
});

app.get('/contact',(req,res)=>{
  res.render('contact',{pageHead:'Contact',pageContent:contactContent});
});

app.get('/compose',(req,res)=>{
  res.render('compose',{pageHead:'Compose',editTitle:"",editContent:''});
});

app.post('/compose',(req,res)=>{
  var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
  var newPost={
    title:req.body.composeTitle,
    post:req.body.composePost,
    created:today
};
  // var newPost={title:post};
  posts.push(newPost);
  // console.log(newPost);
  res.redirect('/');
  // res.redirect('/');
});

app.get('/posts/:postName',(req,res)=>{
  var ans=false;
  posts.forEach((post) => {
    if(_.lowerCase(post.title)===_.lowerCase(req.params.postName)){
      // var postTitle=post.title;
      // var postText=post.posts;
      ans=true;
      console.log(_.lowerCase(req.params.postName) +" , "+post.title);
      res.render('post',{title:post.title,content:post.post,created:post.created});
    }
  });

  if(!ans){
    console.log("Not found");
  }
})

app.get('/edit/:postName',(req,res)=>{
  posts.forEach((post) => {
    if(_.lowerCase(post.title)===_.lowerCase(req.params.postName)){
      const prevTitle=post.title;
      const prevContent=post.post;
      res.render('compose',{pageHead:'Edit '+prevTitle,editTitle:prevTitle,editContent:prevContent});
      // res.render('post',{title:post.title,content:post.post});
    }
  });
});












app.listen(3000, function() {
  console.log("Server started on port 3000");
});
