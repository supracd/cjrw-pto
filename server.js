var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var request = require("request");
var https = require('https');
var app = express();

//var PTO_FILE = path.join(__dirname, 'src/assets/js/components/pto-data.json');

app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
var GET_PTO_OPTIONS = {
    method: 'GET',
    url: 'https://cjrwpto-767a.restdb.io/rest/pto',
    headers:
    {   'cache-control': 'no-cache',
        'x-apikey': 'f748dba8e3fb47f8f2687ffadf548877afc5e',
        'content-type': 'application/json' },

    json: true
};

var POST_PTO_OPTIONS = {
    method: 'POST',
    url: 'https://cjrwpto-767a.restdb.io/rest/pto',
    headers:
    {   'cache-control': 'no-cache',
        'x-apikey': 'f748dba8e3fb47f8f2687ffadf548877afc5e',
        'content-type': 'application/json' },

    json: true
};

var PUT_PTO_OPTIONS = {
    method: 'PUT',
    url: 'https://cjrwpto-767a.restdb.io/rest/pto',
    headers:
    {   'cache-control': 'no-cache',
        'x-apikey': 'f748dba8e3fb47f8f2687ffadf548877afc5e',
        'content-type': 'application/json' },

    json: true
};
var DELETE_PTO_OPTIONS = {
    method: 'DELETE',
    url: 'https://cjrwpto-767a.restdb.io/rest/pto',
    headers:
    {   'cache-control': 'no-cache',
        'x-apikey': 'f748dba8e3fb47f8f2687ffadf548877afc5e',
        'content-type': 'application/json' },

    json: true
};
app.get('/api/pto', function(req, res) {
    var options = JSON.parse(JSON.stringify(GET_PTO_OPTIONS));
    request.get(options, function (error, response, body) {
        if (error) {
            console.error(error);
            process.exit(1);
        }
        res.json(body);
    });
});

app.get('/api/pto/calendar', function(req, res) {
    var options = JSON.parse(JSON.stringify(GET_PTO_OPTIONS));
    request.get(options, function (error, response, body) {
        if (error) {
            console.error(error);
            process.exit(1);
        }
        var events = [];
        for(var i = 0; i < body.length; i++){
                var cls = '';
                if(body[i].approved){
                    cls = 'badge badge-pill badge-success';
                }else{
                    cls = 'badge badge-pill badge-danger';
                }
                events.push({id: body[i]['_id'],
                             title: body[i]['name'],
                             class: cls,
                             start: new Date(body[i]['date_start']),
                             end: new Date(body[i]['date_end'])
                         })


        }
        res.json(events);
    });
});

app.get('/api/pto/:id', function(req, res) {
    var options = JSON.parse(JSON.stringify(GET_PTO_OPTIONS));
    options.url += '/' + req.params.id;
    request.get(options, function (error, response, body) {
        if (error) {
            console.error(error);
            process.exit(1);
        }
        res.json(body);
    });
});

app.post('/api/pto/create', function(req, res) {
    var options = JSON.parse(JSON.stringify(POST_PTO_OPTIONS));
    options.body = {
        'name': req.body.name,
        'date_start': req.body.date_start,
        'date_end': req.body.date_end,
        'approved': false
    };
    request(options, function (error, response, body) {
        if (error) {
            console.error(error);
            process.exit(1);
        }
        res.json(body);
    });
});




app.patch('/api/pto/edit/:id', function(req, res) {
    var options = JSON.parse(JSON.stringify(PUT_PTO_OPTIONS));
    options.body = {
        'name': req.body.name,
        'date_start': req.body.date_start,
        'date_end': req.body.date_end
    };
    options.url += '/' + req.params.id;
    request(options, function (error, response, body) {
        if (error) {
            console.error(error);
            process.exit(1);
        }

        res.json(body);
    });

});
app.patch('/api/pto/approve/:id', function(req, res) {
    var options = JSON.parse(JSON.stringify(PUT_PTO_OPTIONS));
    options.body = {
        'name': req.body.name,
        'date_start': req.body.date_start,
        'date_end': req.body.date_end,
        'approved': true
    };
    options.url += '/' + req.params.id;
    request(options, function (error, response, body) {
        if (error) {
            console.error(error);
            process.exit(1);
        }

        res.json(body);
    });

});
app.patch('/api/pto/disapprove/:id', function(req, res) {
    var options = JSON.parse(JSON.stringify(PUT_PTO_OPTIONS));
    options.body = {
        'name': req.body.name,
        'date_start': req.body.date_start,
        'date_end': req.body.date_end,
        'approved': false
    };
    options.url += '/' + req.params.id;
    request(options, function (error, response, body) {
        if (error) {
            console.error(error);
            process.exit(1);
        }

        res.json(body);
    });

});
app.delete('/api/pto/delete/:id', function(req, res) {

    var options = JSON.parse(JSON.stringify(DELETE_PTO_OPTIONS));
    options.url += '/' + req.params.id;
    request(options, function (error, response, body) {
        if (error) {
            console.error(error);
            process.exit(1);
        }
        res.json(body);
    });

});


// if (process.env.PORT) {
//     window.port = process.env.PORT;
// } else {
//     window.port = '3000';
// }

app.listen(app.get('port'), function() {
    console.log('Server started: https://localhost:' + app.get('port') + '/');
});
