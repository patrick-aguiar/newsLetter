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
      url: '**********',
      headers: { 
        'Authorization': 'Basic cGF0cmljay5hZ3VpYXJAZ21haWwuY29tOjNkMmJjN2E4MzUyYTBmMTM1YWM4ZTkxZmMzZDQ1OWQ5LXVzMjA=', 
        'Content-Type': 'text/plain', 
        'Cookie': 'ak_bmsc=BB5B7A8E4FE7904DF874AB7CAC1337F9~000000000000000000000000000000~YAAQxmCWuCfPUdx8AQAAjNxa4w27JvIQzu2cgo7oyJ+z+V88xtwnY3lfyMnkdE8PvwwC9bVkfVvkMsLNQrYtX6AuH6yP9bexvTmMfDlGMSvIk/FDD6ue2N1NK1WkpjP0xahyR1YKtEx2t6hemu//1wEpXnA5M7yHxpm9AsP1HAn0aGHkj8zuPUz7BkBs1zRWbbfa9XObInIFGtNUwPk+aGVsfVjIyV+wS0dfDNCCDt9OZVqFqfBuUQyK/y9n/eoAaUec/DPIXWL3eRBH+MUcv58oJPT9z9J5ANLI9mwJjXESaiRAPrPyqa0w4KkhAmMfOz8KDfNQ6Fga2JSe+Twml8L5hXXd0LHNepvrxn4NU79mOImCTWDiyHug0zLwT/y9gWfUrQ=='
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      res.sendFile(__dirname + "/success.html");
      console.log(JSON.stringify(response.data.status));
    })
    .catch(function (error) {
      if(error.response.data.title == 'Member Exists'){
        res.sendFile(__dirname + "/emailexists.html");
      }else if(error.response.data.title == 'Invalid Resource'){
        res.sendFile(__dirname + "/failure.html");
      }
      console.log(error.response.data.status);
      console.log(error);
    });
});
app.post("/failure", (req, res) =>{
  res.redirect("/");

});


app.listen(3000, () =>{
    console.log("Server has started");
});
