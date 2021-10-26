const express = require("express");
const https = require("https");
const axios = require("axios");

const app = express();

app.use(express.static(__dirname)); //Because this file use local and out side files, we need to declare as static
app.use(express.urlencoded({extended: true})); //This makes possible to select and use elements of the HTML document (parseFloat(req.body.lastName);)

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) =>{

    const fName = req.body.fname;
    const lName = req.body.lname;
    const email = req.body.email;

    console.log(req.body);

    const data = {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fName,
                LNAME: lName
            }
    };
     
    var config = {
      method: 'post',
      url: 'https://us20.api.mailchimp.com/3.0/lists/e762622ee1/members/',
      headers: { 
        'Authorization': '3d2bc7a8352a0f135ac8e91fc3d459d9-us20', 
        'Content-Type': 'text/plain', 
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
        return res.sendFile(__dirname + "/success.html");
    })
    .catch(function (response) {
       return res.sendFile(__dirname + "/failure.html");
    });
});

app.post("/failure", (req, res) =>{
    res.redirect("/");

});

app.listen(process.env.PORT || 3000, () =>{
    console.log("Server has started");
});



// API key 3d2bc7a8352a0f135ac8e91fc3d459d9-us20

// List Unique ID Audiance Hibiscos e762622ee1