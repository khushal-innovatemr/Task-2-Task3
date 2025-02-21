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
    Temp:{type:String,required:true},
    humidity:{type:Number,required:true},
    weather_s:{type:String,required:true},
},'weather_data');

app.post('/weather',async(req,res) => {
    const degrees = new Intl.NumberFormat('en-US', {
        style: 'unit',
        unit: 'celsius',
      });

     try{
       const Data = await weather('london')

       const d = new Weathers({
            name :Data.name,
            Temp:degrees.format(Data.main.temp) ,  
            humidity :Data.main.humidity,
            weather_s:Data.weather[0].description
        })
        
        await d.save();
       res.send('Data Saved Successfully');
   } 
   catch (error) {
    console.error("Error getting weather data:", error)
    res.send("data shoudlnt be saved");
}

})  

app.get('/weather',async(req,res) => {
    
    try{
        const dt = await Weathers.find();
        res.send(dt);
        console.log(dt);
    }
    catch(err){
        console.log(err)
    }
});

async function createIndex() {
    try {
        const collection = mongoose.connection.collection('weather_data'); 
        const id= await collection.createIndex({ name: 1 });

        console.log(`Index Created Successfully: ${id}`);
        const indexes = await collection.indexes();

        console.log('Indexes in the Collection:', indexes);
    } catch (error) {
        console.error('Error creating index:', error);
    }
}

createIndex();

app.listen(3146, () => {
    console.log('Server is running on port 3146');
});
