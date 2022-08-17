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

    let url = 'https://us11.api.mailchimp.com/3.0/lists/0c8ee0d6d4';

    let options = {
        method: 'POST',
        auth: 'piballtec:a2ce993ce8af7de86ee7f3ce50e44a29-us11',
    }

    let request = https.request(url, options, function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname + '/success.html');
        } else {
            res.sendFile(__dirname + '/failure.html');
        }

        response.on('data', function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

});

app.post('/failure', function(req, res){
    res.redirect('/');
});

app.post('/success', function(req, res){
    res.redirect('/');
})

app.listen(port, () => {
    console.log('Listening on port 8000');
});


// let list_id = '0c8ee0d6d4';
// web_dev_20
// let api_key = 'a2ce993ce8af7de86ee7f3ce50e44a29-us11';