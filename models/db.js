const mongoose = require('mongoose'); //Avem nevoie de mongoose
//Daca e buna conexiune afiseaza succes, daca nu eroare
mongoose.connect('mongodb://localhost:27017/TransfermarktDB', ({ useNewUrlParser: true, useUnifiedTopology: true }), (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./players.model');