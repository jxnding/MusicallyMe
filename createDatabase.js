var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/MusicallyMe');

var accountSchema = mongoose.Schema({
    email: String,
    password: String
});

var Account = mongoose.model('Account', accountSchema);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
    

});
