var 
    // Requirements
    express = require('express'),
    app = express(),
    request = require('request'),
    rp = require('request-promise'),

    // Default environment variables:
    port = process.env.PORT || 2995;

app.listen(port, () => {
    console.log('Environment variable PORT is: ' + port);
});

app.get('/', (req, res) => {
    let data = {"data": "Welcome"}
    res.send(data);
});

app.get('/branches/:account/:repo', (req, res) => {
    let account = req.params.account;
    let repo = req.params.repo;
    let url = "https://api.github.com/repos/"+account+"/"+repo+"/branches";

    console.log(url);
    getData(url).then((data) => {
        res.send(data);
    })
        .catch(err => {
            res.send(err);
        });  
});

app.get('/branches/names/:account/:repo', (req, res) => {
    let account = "docker";
    let repo = "docker.github.io";
    let url = "https://api.github.com/repos/"+account+"/"+repo+"/branches";

    getData(url).then((data) => {
        let names = data.map((entry) => {
            return entry.name;
        });
        res.send(names);
    })
        .catch(err => {
            res.send(err);
        });  
});

function getData(url) {

    let headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'request',
    };
    let options = {url, headers};
    return rp(options).then((body) => {
        if (typeof body === "string") {
            body = JSON.parse(body);
        }
        return body;
    }, (err) => {
        return err;
    });

}