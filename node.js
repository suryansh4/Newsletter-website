const express = require(`express`);
const mongoose = require('mongoose');
const bodyparser = require(`body-parser`);
const ejs = require(`ejs`);
const _=require(`lodash`);
const { constant } = require("async");

 //databse connection
const uri = "mongodb+srv://admin-suryansh:suryanshpanwar@cluster0.snk5b.mongodb.net/newsletter?retryWrites=true&w=majority";

mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true})
.then(() => console.log(`mongoose connected`))
.catch(err => console.error(err))

//data base schema 
const newsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    post: {type: String, required: true}
})

const User = mongoose.model('User', newsSchema)
//created database schema

let news = [];

// const homecontent = `Lorem ipsum, dolor sit amet consectetur adipisicing elit.homecontent Excepturi rem ipsum, dolor sit amet consectetur adipisicing elit.homecontent Excepturi ducimus placeat doloducimus placeat dolores, sequi totam mollitia! Dicta veritatis, deleniti ullam voluptatum laudantium, esse ratione fugit quae natus modi amet neque facere explicabo ipsum veniam libero sit officiis delectus repellat nesciunt rerum! Quidem eaque quasi, ullam et iste laboriosam blanditiis tempore sequi!5`;

const aboutcontent=`Hey there ! welcome to this beautiful blog website where you can share your views freely without registering . this website is 
made and designed by Suryansh Panwar using EJS , node , css . hope you like this webiste , many more changes will come in this webiste in future updates
so for that stay tunned stay connected`;
const contactcontant=`contact me through Email panwarsuryansh2gmail.com`;

let key;

const app = express();

app.use(express.json());
app.use(express.static(`public`));

app.set(`view engine`, `ejs`);

app.listen(8000, function () {
    console.log(`listning at port 8000`)
})
app.get(`/`,async (req, res) => {
    
   const all = await User.find().then(res => news = res).catch(err => console.log(err));
    // console.log(all);   
    res.render("Home", {"news": all});
})
app.get(`/about`, (req, res) => {
    res.render("about",{homecont:aboutcontent});
})
app.get(`/contact`, (req, res) => {
    res.render("contact",{homecont:contactcontant});
})
app.get(`/compose`, (req, res) => {
    res.render("compose");
})

app.post(`/compose`,(req,res)=>{
    let compose ={

      title:req.body.messagetitle,
      message:req.body.message
    }
    
    


    // news.push(compose);

    //saving the news in databse online

    let new_news = new User({name:req.body.messagetitle , post:req.body.message});
    new_news.save().then(()=> res.status(201).json(new_news)).catch(err => res.status(400).send(err))
   

    //news saved in DB

    res.redirect(`/`);

    
})

app.get(`/posts/:postname`, (req,res)=>{
   
   let reuqestedtitle= _.lowerCase(req.params.postname);

   composearr.forEach(function(post){
       console.log(composearr);
    let storedtitle=_.lowerCase(post.title);
        console.log(storedtitle);
    if(reuqestedtitle==storedtitle)
    {      console.log(`yew`);
        res.render(`post/post.title`,{posttitle:post.title, postmessage:post.message})
    }
   })
  

})

app.patch("/", (req, res) => {
    let compose ={
        title:req.body.messagetitle,
        message:req.body.message
      }
 
      User.find({title}).updateOne({compose})
})

app.delete("/", (req, res) => {
    let id = req.body.id;
    let post = User.findById(id)

    if (post) post.deleteOne()
    else res.send("deleted")
})