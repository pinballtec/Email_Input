let express = require('express');
let bodyParser = require('body-parser');
let request = require('request');

port = 8000;
let app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('static'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/signup.html')
});

app.post('/', function(req, res){
    console.log(req.body);
    let name = req.body.name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    res.send(name +  " " + last_name +  " " + email);
})

app.listen(port, () => {
    console.log('Listening on port 8000');
});