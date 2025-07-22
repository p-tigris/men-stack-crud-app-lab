const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');

const app = express();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
})

const Planet = require('./models/planet.js');

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.get('/', async (req, res) => {
    res.render("index.ejs");
})

app.get('/planets', async (req, res) => {
    const allPlanets = await Planet.find({})

    res.render("planets/index.ejs", { planets: allPlanets });
})

app.get('/planets/new', async (req, res) => {
    res.render("planets/new.ejs");
})

app.post('/planets', async (req, res)=> {
    if (req.body.isDwarfPlanet === 'on') {
        req.body.isDwarfPlanet = true;
    } else {
        req.body.isDwarfPlanet = false;
    }

    await Planet.create(req.body);
    res.redirect('/planets/');
})

app.listen((3000), () => {
    console.log('Listening on port 3000');
})