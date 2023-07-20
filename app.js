const express = require("express");
const bodyParser = require("body-parser");
const client = require("@mailchimp/mailchimp_marketing");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.post("/", function(req, res){
    const fName = req.body.Fname;
    const lName = req.body.Lname;
    const email = req.body.email;
    console.log(fName, lName, email);



    client.setConfig({
        apiKey: "fe53a8f9739269bf7409239ac7466b74-us21",
        server: "us21",
      });
      
      const run = async () => {
        const response = await client.lists.batchListMembers("a063f71f1d", {
          members: [{
              email_address: email,
              status: "subscribed",
              merge_fields: {
                  FNAME: fName,
                  LNAME: lName 
              }
          }],
        });
        if(response.errors[0] == undefined){
            res.sendFile(__dirname + "/success.html");
        } else if(response.errors[0].error === email + ' is already a list member, do you want to update? please provide update_existing:true in the request body'){
            res.sendFile(__dirname + "/exist.html");
        } else{
            res.sendFile(__dirname + "/fail.html");
        }
      };
      
      run();

      

});

app.get("/", function(req, res){
    // res.send("Working");
    res.sendFile(__dirname + "/index.html");
});

app.listen(3000), function(){
    console.log("Server is running");
};

// API key
// fe53a8f9739269bf7409239ac7466b74-us21

// List ID
// a063f71f1d


