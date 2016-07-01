var express = require( 'express' );
var app = express();
var path = require( 'path' );
var mongoose = require( 'mongoose' );
var bodyParser = require( 'body-parser' );
app.use( bodyParser.json() );

mongoose.connect( 'localhost:27017/hero_db');  //Mongoose db to connect with.

var Schema = mongoose.Schema;

var heroSchema = new Schema({
  alias: String,
  first: String,
  last: String,
  city: String,
  power: String
});

var heroModel = mongoose.model( 'heroModel', heroSchema );

app.get( '/', function( req, res ) {  //This is the base URL.
  res.sendFile( path.resolve( 'public/views/index.html' ) );
});

app.post( '/postRoute', function( req, res ) {  //This is going to be our post route.
  var savedHero = {
    alias: req.body.heroName,
    first: req.body.nameFirst,
    last: req.body.last,
    city: req.body.city,
    power: req.body.superPower
  };
  console.log( 'POST received hero: ' + savedHero.alias + ', Super Power: ' + savedHero.superPower + '.');  //Tell me what you received.

  var newHero = heroModel( savedHero );
  newHero.save();
  res.send( true );
});

app.get( '/getRoute', function( req, res ) {
  console.log("ghj");
  heroModel.find().then( function( data ) {
    res.send( data );
  });
});

app.use( express.static( 'public' ) );  //Sets our 'public' file to static.

app.listen( 4242, 'localhost', function( req, res ) {  //Designates which port, on which, to listen.
  console.log( 'Hailing frequencies open. Listening on PORT 4242.' );
});
