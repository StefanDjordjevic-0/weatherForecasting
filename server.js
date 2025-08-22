import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_Key = "";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async (req, res)=> {
    const resultBelgrade = await axios.get(API_URL, {
        params:{
            q: "Belgrade",
            appid: API_Key,
            units: "metric",
        }
    });
    const belgrade = resultBelgrade.data;

    const resultBerlin = await axios.get(API_URL, {
        params:{
            q: "Berlin",
            appid: API_Key,
            units: "metric",
        }
    });
    const berlin = resultBerlin.data;

    const resultParis = await axios.get(API_URL, {
        params:{
            q: "Paris",
            appid: API_Key,
            units: "metric",
        }
    });
    const paris = resultParis.data;
    
    res.render("index.ejs",{
        Belgrade: belgrade,
        Berlin: berlin,
        Paris: paris
    });
})

app.post("/search", async (req, res)=>{
    try{
    const response = await axios.get(API_URL, {
        params:{
            q: req.body.searchName,
            appid: API_Key,
            units: "metric",
        }
    });
    const data = response.data;
    res.render("search.ejs", {
        data: data,
        error: response.status
    });
    }catch(error){
        console.log(error.message);
        res.render("search.ejs", {
        error: error.status
    });
    }
    
});
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});