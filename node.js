const express = require(`express`);
const bodyparser = require(`body-parser`);
const ejs = require(`ejs`);
const _=require(`lodash`);
const { constant } = require("async");
const homecontent = `Lorem ipsum, dolor sit amet consectetur adipisicing elit.homecontent Excepturi rem ipsum, dolor sit amet consectetur adipisicing elit.homecontent Excepturi ducimus placeat doloducimus placeat dolores, sequi totam mollitia! Dicta veritatis, deleniti ullam voluptatum laudantium, esse ratione fugit quae natus modi amet neque facere explicabo ipsum veniam libero sit officiis delectus repellat nesciunt rerum! Quidem eaque quasi, ullam et iste laboriosam blanditiis tempore sequi!5`;

const aboutcontent=`aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`;
const contactcontant=`cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc`;

let composearr =[];
let key;

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(`public`));

app.set(`view engine`, `ejs`);

app.listen(8000, function () {
    console.log(`listning at port 8000`)
})
app.get(`/`, (req, res) => {
    res.render("Home",{homecont:homecontent,
                       arr:composearr                  
    });
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
   
    composearr.push(compose);

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
        res.render(`post`,{posttitle:post.title, postmessage:post.message})
    }
   })
  

})

