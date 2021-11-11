const axios = require("axios");
const path = require('path');

module.exports = (req, res) => {

    const {fname, lname, email}  = req.body

    const data = {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fname,
                LNAME: lname
            }
    };
    
    var config = {
      method: 'post',
      url: 'https://us20.api.mailchimp.com/3.0/lists/e762622ee1/members/',
      headers: { 
        'Authorization': 'Basic cGF0cmljay5hZ3VpYXJAZ21haWwuY29tOjNkMmJjN2E4MzUyYTBmMTM1YWM4ZTkxZmMzZDQ1OWQ5LXVzMjA=', 
        'Content-Type': 'text/plain', 
        'Cookie': 'ak_bmsc=BB5B7A8E4FE7904DF874AB7CAC1337F9~000000000000000000000000000000~YAAQxmCWuCfPUdx8AQAAjNxa4w27JvIQzu2cgo7oyJ+z+V88xtwnY3lfyMnkdE8PvwwC9bVkfVvkMsLNQrYtX6AuH6yP9bexvTmMfDlGMSvIk/FDD6ue2N1NK1WkpjP0xahyR1YKtEx2t6hemu//1wEpXnA5M7yHxpm9AsP1HAn0aGHkj8zuPUz7BkBs1zRWbbfa9XObInIFGtNUwPk+aGVsfVjIyV+wS0dfDNCCDt9OZVqFqfBuUQyK/y9n/eoAaUec/DPIXWL3eRBH+MUcv58oJPT9z9J5ANLI9mwJjXESaiRAPrPyqa0w4KkhAmMfOz8KDfNQ6Fga2JSe+Twml8L5hXXd0LHNepvrxn4NU79mOImCTWDiyHug0zLwT/y9gWfUrQ=='
      },
      data : data
    };
    axios(config)
    .then((response) => {
        res.sendFile(path.resolve(__filename + "/../../../public/success.html"));
    })
    .catch((error) => {
      if(error.response.data.title == 'Member Exists'){
        res.sendFile(path.resolve(__filename + "/../../../public/emailexists.html"));
      }else if(error.response.data.title == 'Invalid Resource'){
        res.sendFile(path.resolve(__filename + "/../../../public/failure.html"));
      }
    });
};