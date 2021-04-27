const mongoose = require('mongoose');
//Definim structura bazei de date
var playersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },
   nations: {
        type: String
    },
    team: {
        type: String
    },
    city: {
        type: String
    }
});

mongoose.model('Players', playersSchema);