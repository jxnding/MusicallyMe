//Express declaration
var express = require('express');
var app = express();

//Mongo declaration
var mongojs = require('mongojs');
var db = mongojs('MusicallyMe', ['accountCollection']);

/////////////////////Global Variables (for Mongo)/////////
var mongoData;
///////////////////////////////////////////////////////////
//////////////MongoDB functions///////////////////////////
function registerAccount(username, inputPassword){
    //uses find to check if username currently exists
    db.accountCollection.find({account: username}).toArray(function(err,result){
        if(err){
            //database error
            console.log("error in registerAccount");
        }
        else if (result.length){
            //Username already exists
            console.log("Username already exists!");
        }
        else{
            //here we can insert the account, since there was no error and username does not already exist
            db.accountCollection.insert({
                account: username,
                password: inputPassword,
                picture: ""
            });
            console.log(username + " Registered");
        }
    });
}

// required to support parsing of POST request bodies
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// put all of your static files (e.g., HTML, CSS, JS, JPG) in the static_files/
app.use(express.static('static_files'));


//required to support parsing of cookies
var cookieParser = require('cookie-parser');
app.use(cookieParser());













app.get('/home', function(req,res){

    console.log("Cookies: ", req.cookies['account']);

    var nameToLookup = req.cookies['account']; // this matches the '*' part of '/users/*' above

    db.accountCollection.find({account: nameToLookup}).toArray(function(err,result){
        if(err){
            //database error
            console.log("error in findAccount");
        }
        else if (result.length){ //if found
            console.log("Username found" + result[0]["account"]);
          //   res.send(result);
            res.cookie('account' , nameToLookup).send(result);
            return;
        }
        else{ //not found
            console.log("Username not found!");
            res.json();
        }
    });
});


// CREATE a new user
//
// To test with curl, run:
//   curl -X POST --data "name=Carol&job=scientist&pet=dog.jpg" http://localhost:3000/users
app.post('/users', function (req, res) {
    //postBody is body of POST req
  var postBody = req.body;
  var username = postBody.username; //username and password here, both plaintext
  var password = postBody.password;

  // must have a name!
  if (!username) {
    res.send('No Username');
    return; // return early!
  }

  registerAccount(username, password);

  res.send('OK');
});


// READ profile data for a user
//
// To test with curl, run:
//   curl -X GET http://localhost:3000/users/Philip
//   curl -X GET http://localhost:3000/users/Jane
app.get('/users/*', function (req, res) {
  var nameToLookup = req.params[0]; // this matches the '*' part of '/users/*' above

  db.accountCollection.find({account: nameToLookup}).toArray(function(err,result){
      if(err){
          //database error
          console.log("error in findAccount");
      }
      else if (result.length){ //if found
          console.log("Username found" + result[0]["account"]);
        //   res.send(result);
          res.cookie('account' , nameToLookup).send(result);
          return;
      }
      else{ //not found
          console.log("Username not found!")
      }
  });

  // res.send('{}'); // failed, so return an empty JSON object!
});


// UPDATE a user's profile with the data given in POST
//
// To test with curl, run:
//   curl -X PUT --data "job=bear_wrangler&pet=bear.jpg" http://localhost:3000/users/Philip
app.put('/users/*', function (req, res) {
  var nameToLookup = req.params[0]; // this matches the '*' part of '/users/*' above
  // try to look up in fakeDatabase
  postBody = req.body;

    //   for (key in postBody) {
    //     var value = postBody[key];
    //     // e[key] = value;
    //     db.accountCollection.update({account: nameToLookup},{
    //         key:value
    //     });
    //   }

    // db.accountCollection.update({account: nameToLookup},{ $set: { picture: postBody["picture"] } });
    db.accountCollection.update({account: nameToLookup},{ $set: { picture: postBody["picture"] } });


      res.send('OK');
      return; // return early!





  res.send('ERROR'); // nobody in the database matches nameToLookup
});


// DELETE a user
//
// To test with curl, run:
//   curl -X DELETE http://localhost:3000/users/Philip
//   curl -X DELETE http://localhost:3000/users/Jane
app.delete('/users/*', function (req, res) {
  var nameToLookup = req.params[0]; // this matches the '*' part of '/users/*' above
  // try to look up in fakeDatabase

console.log(nameToLookup);
  //remove function to delete the account
  db.accountCollection.remove({account:nameToLookup});

  res.send('OK'); // nobody in the database matches nameToLookup
});


// start the server on http://localhost:3000/
var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Server started at http://localhost:%s/', port);
});


////////////////////////////MUSIC NOW//////////////////////////////////////
app.post('/music/', function(req, res) {

res.send(null);
});
