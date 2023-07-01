const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const app = express();



app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const Blog_array = [];

app.get("/",function(req,res)
{
    const len = 100;
    res.render("home",
    (
        {
            homecont : homeStartingContent,
            Blog_Post : Blog_array 
        }
    ))
})

app.get("/about",function(req,res)
{
    res.render("about",({about:aboutContent}))
})

app.get("/contact",function(req,res)
{
    res.render("contact",({contact:contactContent}))
})

app.get("/compose",function(req,res)
{
    res.render("compose")
})

app.get("/post/:term",function(req,res)
{
    var encoded_term =_.lowerCase(req.params.term);
    
    Blog_array.forEach(function(term_search)
    {
        var present_term =_.lowerCase(term_search.Title);
        if(present_term === encoded_term)
        {
            res.render("post",({
                Title : term_search.Title,
                Content : term_search.Content
            }))
        } 
    })
})

app.post("/compose",function(req,res)
{
    var Blog_Content =
    {
        Title : req.body.Blog_title,
        Content : req.body.Blog_content
    }
    Blog_array.push(Blog_Content);
    res.redirect("/");

})



app.listen(3000,function()
{
    console.log("server running in port number 3000.")
})