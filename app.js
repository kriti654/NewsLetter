const express = require("express");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({extended :true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");

});

app.post("/", function(req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailId = req.body.email;
    const data ={
        members: [
            {
                email_address: emailId,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us1.api.mailchimp.com/3.0/lists/e49aaa3bd2";

    const options = {
        method: "POST",
        auth: "kriti :da0daa6074af1b10718621a3019324b-us1",
    };

    const request = https.request(url, options, function(response){
        if(response.statusCode ==200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });

    });
    request.write(jsonData);
    request.end();
});
 
app.post("/failure.html", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server Started");
});


//Api key- e2efa27368ae4e59964ca89019e7d566-us1
//unique id for audience-e49aaa3bd2
