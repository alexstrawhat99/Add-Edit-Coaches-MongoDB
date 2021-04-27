const express = require('express'); //Express.js, or simply Express, is a back end web application framework for Node.js
var router = express.Router();
const mongoose = require('mongoose');
const Players = mongoose.model('Players');


//HTTP methods - app.get() to handle GET requests
router.get('/', (req, res) => {   // "/"" - URL default Primi datele
    
    res.render("players/addOrEdit", {  //Afisam fisa HTML "addOrEdit"
    
        viewTitle: "Insert Players"  //Numele filei html
        
    });
    
});







router.get('/homepage', (req, res) => {   // "/"" - URL default Primi datele
    
res.render("players/homepage")

});

//app.post() to handle POST requests
router.post('/', (req, res) => { //Afisam datele
    if (req.body._id == '')  //daca e ceva adaugat
        insertRecord(req, res);    //modificam record
        else
        updateRecord(req, res);   //sau il updatam
         console.log(req.body);    //Afisam un mesaj in consola cu detalii despre record
});

// Luam informatiile din baza de date si le scriem
function insertRecord(req, res) {
    var players = new Players();  //variabila noastra player
    players.name = req.body.name;  //fiecare atribut luat in parte
    players.nations = req.body.nations;
    players.team = req.body.team;
    players.city = req.body.city;
    players.save((err, doc) => {
        if (!err)    //Daca nu e eroare ne duce catre kista jucatorilor
            res.redirect('players/list');
         else {
             if (err.name == 'ValidationError') {
                 handleValidationError(err, req.body);
                 res.render("players/addOrEdit", {
                     viewTitle: "Insert Players",
                     players: req.body
                 });
             }
            else {   //Daca e eroare afisam in consola mesajul
                console.log('Error during record insertion : ' + err);
        }
            }
    });
}

function updateRecord(req, res) {
    Players.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('players/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("players/addOrEdit", {
                    viewTitle: 'Update Players',
                    players: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!   res.json('ffrom list');
router.get('/list', (req, res) => {  //functia de trimite catre baza de date datele puse
    Players.find((err, docs) => {
        if (!err) {  //Daca nu e eroare 
            res.render("players/list", {
                list: docs
            })
            
        }
        else {
            console.log('Error in retrieving players list :' + err);
        }
    })
    .lean()
    // res.json('ffrom list');
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['fullnameError'] = err.errors[field].message;
                break;
            case 'nations':
                body['nationsError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Players.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("players/addOrEdit", {
                viewTitle: "Update Players",
                players: doc
            });
        }
    });
});
//Delete players
router.get('/delete/:id', (req, res) => {
    Players.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('views\players\list.hbs');
            // res.render('views\players\list.hbs');
          // res.refresh('list.hbs');
        }
        else { console.log('Error in players delete :' + err); }
    })
    //res.redirect('views\players\list.hbs');
    // .lean()
}); 

module.exports = router; //exportam router ul