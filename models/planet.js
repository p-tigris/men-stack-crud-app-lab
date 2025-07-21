const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    composition: { type: String, required: true },
    moons: { type: Number, required: true },
    isDwarfPlanet: { type: Boolean, required: true },
});

const Planet = mongoose.model('Planet', planetSchema);

module.exports = Planet;