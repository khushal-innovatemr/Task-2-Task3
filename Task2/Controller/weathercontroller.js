const Weathers = require('../model/model');

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
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
    }
}

async function saveWeatherData(req, res) {
    try {
        const Data = await weather('london');

        const d = new Weathers({
            name: Data.name,
            temp: Data.main.temp,
            humidity: Data.main.humidity,
            weather_s: Data.weather[0].description
        });

        await d.save();
        res.send('Data Saved Successfully');
    } catch (error) {
        console.error("Error getting weather data:", error);
        res.send("Data couldn't be saved");
    }
}

async function getWeatherData(req, res) {
    try {
        const dt = await Weathers.find();
        res.send(dt);
    } catch (err) {
        console.error(err);
    }
}

async function createIndex() {
    try {
        const collection = mongoose.connection.collection('weather_data'); 
        const id = await collection.createIndex({ name: 1 });

        console.log(`Index Created Successfully: ${id}`);
        const indexes = await collection.indexes();

        console.log('Indexes in the Collection:', indexes);
    } catch (error) {
        console.error('Error creating index:', error);
    }
}

createIndex();

module.exports = {
    saveWeatherData,
    getWeatherData
};