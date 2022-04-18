const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelpcamp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 400; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 100;
        const camp = new Campground({
            author:'6257e44f7b7ea0cb8f106915',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type:"Point",
                coordinates:[
                    cities[random1000].longitude, 
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dsmsp5rlx/image/upload/v1650150745/YelpCamp/cnxfxh0b5toeywxjsfeh.jpg',
                  filename: 'YelpCamp/cnxfxh0b5toeywxjsfeh',
                },
                {
                  url: 'https://res.cloudinary.com/dsmsp5rlx/image/upload/v1650150381/YelpCamp/kiahrowsljyu7uezs29p.jpg',
                  filename: 'YelpCamp/kiahrowsljyu7uezs29p',
                },
                {
                  url: 'https://res.cloudinary.com/dsmsp5rlx/image/upload/v1650098622/YelpCamp/rxts13fxtyp99og102ve.jpg',
                  filename: 'YelpCamp/rxts13fxtyp99og102ve',
                }
              ],
            description: '  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit inventore nulla fuga nostrum, hic facere reiciendis dolore. Delectus, officiis rem.',
            price: price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})