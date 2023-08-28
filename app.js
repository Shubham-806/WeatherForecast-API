const express=require("express");
const app=express();
const bodypar=require("body-Parser");
const https=require("https");
app.use(bodypar.urlencoded({extented:true}));


app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/index.html");
    });
    app.post("/",function(req,res){
        const query=req.body.cityname;
        const appkey="5fbce39befc99f953fad756f46eb6418";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid="+ appkey;
    https.get(url,function(response)
    {
        console.log(response.statusCode);
        response.on("data",function(data)
        {
            const weatherdata=JSON.parse(data)
            const temp=weatherdata.main.temp
            const des=weatherdata.weather[0].description;
            const ion=weatherdata.weather[0].icon
            const link="https://openweathermap.org/img/wn/"+ion+"@2x.png"
            res.write("<p>The current weather conditionof "+query+" is "+des+"</p>")
            res.write("<h1>The weather is currently"+temp+"degree celcius</h1>")
            res.write("<img src="+link+">")
            
            res.send();
            
        });
    });
});

app.listen(3000,function(req,res)
{
    console.log("port 3000 is started");

});



