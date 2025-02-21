const mongoose  = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://admin:admin@cluster0.uduq8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});


const api = "4e302e29113311c8c2e5e5fc6e2173f9";

async function weather(city){
    try{
        const uri = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;
        const response = await fetch(uri);
        if(!response.ok){
            throw new Error(`error:${response.status}`);
        }

        const data = await response.json();
        return data;
    }

    catch (error) {
        console.error("Error fetching weather data:", error.message);
    }
}
weather('london');

const Weathers = mongoose.model('Weather', {
    name: { type: String, required: true },
    temp: { type: Number, required: true },
    humidity:{type:Number,required:true},
    weather_s:{type:String,required:true}
},'weather_data');

app.post('/weather',async(req,res) => {
    const degrees = new Intl.NumberFormat('en-US', {
        style: 'unit',
        unit: 'celsius',
      });

     try{
       const Data = await weather('london')

       const d =[
            {name :Data.name},
            {temp :Data.main.temp},
            {humidity :Data.main.humidity},
            {weather_s:Data.weather[0].description},
       ]
       const dq=new Weathers({name:d[0].name,temp:d[1].temp,humidity:d[2].humidity,weather_s:d[3].weather_s})
       await dq.save();
       res.send('thank-you');
   } 
   catch (error) {
    console.error("Error getting weather data:", error);
}
})



