const express = require("express");

const bodyParser = require("body-parser");
const { getChart } = require('billboard-top-100');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res){
    const today = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
    chartDataToday = getChart('hot-100', today, (err, chart) => {
        if (err) {
            console.log(err);
        } else {  
            const topTenItemsToday = chart.songs.slice(0, 10)   
            res.render("home", {topTenItemsToday, today});
        };
});
    
    //res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const query = req.body.date;
    const year = query.slice(0,4);
    const month = parseInt(query.slice(5, 7));
    const day = query.slice(8, 10);
    chartData = getChart('hot-100', query, (err, chart) => {
        if (err) {
            console.log(err);
        } else {  
            const topTenItems = chart.songs.slice(0, 10)   
            res.render("topten", {topTenItems, query, month, day, year, monthArray});
        };
});
});

app.get("/topten", function(req, res){
    res.render("topten", {topTenItems, query});
});



app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});