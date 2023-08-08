const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){

    const query=req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&q="+query+"&appid=97dbb440ebf6e21e4bcbb84894c9c9f8#";

    https.get(url,function(response){  //ye url hmlog bhejenge as a request aur vaha se response aayega
        console.log(response.statusCode);  //ye line ka mtlb response ka status code check ho rha hai ,status code mtln 100,200,300,404 aise 
        
        response.on("data",function(data){
            const weatherData=JSON.parse(data) //this will store the weather data in json formmat
            const temp = weatherData.main.temp   //url se content nikal rhe ain
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p> The weather is currently " + weatherDescription + "<p>")
            res.write("<h1>The temperature in " + query + " is " + temp +"degree Fahreheit .<h1>")
            res.write("<img src =" + imageURL+">")
            res.send()
        })
    })   

   
})

app.listen(3000,function(){
    console.log("Server is running on port 3000");
})