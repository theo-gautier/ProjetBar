'use strict'
const Express = require('express');
const router = Express.Router();

const Passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

const DB = require('../db.js');

Passport.use(new BasicStrategy((username, password, done) => {
  //On test si le user (et le password) sont bien ceux
  //enregistrés en local

  DB.get("SELECT * FROM USERS WHERE USERNAME = ?", [username], (err, user) => {

    if (err) return done(err); //On test d'abord si il y a eu une erreur.
    if(!user){ //Si on a pas d'user
      return done(null, false);
    }
    //Ici on devrait calculer le hash du mot de passe.
    if(user.PASSWORD === password){
      user.PASSWORD = undefined; //ON DETRUIT LE MOT DE PASSE QUI EST CLARIFIE AU DESSUS (OU LE HASH)
      return done(null, user);
    }
    return done(null, false);

  });

}));

router.get('/login', Passport.authenticate('basic', { session: false}), (req, res) => { //On vérifie si on est identifié.

  res.end("Hello " + req.user.USERNAME);
});

module.exports.router = router;
