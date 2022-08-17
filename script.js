let express = require('express');
let bodyParser = require('body-parser');
let request = require('request');
let https = require('https');

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
    // res.send(name +  " " + last_name +  " " + email);
    let data = {
        members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields : {
                FNAME: name,
                LNAME: last_name,
            }
        }
      ]
    };

    let jsonData = JSON.stringify(data);

    let url = '';

    let options = {
        method: 'POST',
        auth: '',
    }

    let request = https.request(url, options, function(response){
        response.on('data', function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

});

app.listen(port, () => {
    console.log('Listening on port 8000');
});


// 