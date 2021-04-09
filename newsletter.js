// requiring modules here
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

// app creation
const app = express();

// app use
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// app get home
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

// app post home
app.post("/", function (req, res) {
  const fName = req.body.fname;
  const lName = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us1.api.mailchimp.com/3.0/lists/a59e7e98c7";

  const options = {
    method: "POST",
    auth: "atharv01:3a45aeca35d1a2d5bf65febf89728abc-us1",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode == "200") {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  });

  request.write(jsonData);
  request.end();
});

// app post failure
app.post("/failure", function (req, res) {
  res.redirect("/");
});

// app listen
app.listen(process.env.PORT || 4990, function () {
  console.log("The server is running on port 4990");
});

// my mailchimp api
// 3a45aeca35d1a2d5bf65febf89728abc-us1

// list id
// a59e7e98c7
