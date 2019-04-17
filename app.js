const hbs = require('hbs');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const geocode = require('./scripts.js');
// var port = process.env.PORT || 8080;

//middleware
var route = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views');
route.use(express.static(__dirname + '/public'));
route.set('view engine', 'hbs');
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({
    extended: true
}));
//middleware end
route.get('/', (request,response) => {
    response.render('index', {
        jumbo_main: "Welcome",
        jumbo_sec: "Goto pricing to convert a currency to USD"
    })
});

route.get('/api_1', async(request,response)=> {
    try{
        response.render('api_1',{
            jumbo_main: "Currency Converter"
        })
    }catch(err) {
        if (err){
            response.render('404')
        }
    }

});

route.post('/get_currency', async(request, response)=> {
    try{
        var entry = request.body.country_entry;
        const code = await geocode.getCode(entry);
        const exchange = await geocode.getCurrency(code);
        response.render('api_1',{
            jumbo_main: "Currency Converter",
            jumbo_sec: `One USD equals ${exchange.rates} ${Object.keys(exchange.code)} (the currency of "${entry}")`
        });
    }catch (err){
        if (err){
            response.render('404', {
                "message": "Unexpected error"
            })
        }
    }

});

route.listen(8080, (request, response)=>{
    console.log('server is up on port 8080')
});
