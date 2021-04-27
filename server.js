require('./models/db');  //Are nevoie de pagina db
//Express.js, or simply Express, is a back end web application framework for Node.js
const express = require('express');
const path = require('path');  //Sa putem folosi "path" in aplicatie
const exphbs = require('express-handlebars'); //Sa putem folosi express handlebars
// const bodyParser = require('express'); //Sa putem folosi body parser

//Exportam router-ul cu player controller pus aici
const playersController = require('./controllers/playersController'); //request statement pt controller


//The view directory for this app
var app = express();
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded( {extended: true} )); //Parse URL-encoded bodies

app.set('views', path.join(__dirname, '/views/')); //facem conexiunea catre directorul /views din aplicatie
//Avem datele de configurare de la express handlebars cu numele extensei hbs (la cele html) si punem layout sa fie pagina principala
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));  
app.set('view engine', 'hbs'); 

app.listen(3000, () => {
    console.log('Express server started at port : 3000'); //Daca merge conexiunea pe portul 3000 afisam mesajul
});

app.use('/players', playersController); //URL de baza pt controller