const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

const request = require('request');
const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// Setup static directory to serve
app.use(express.static(publicDirPath));

// Setup handlerbars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) =>{
    res.render('index',{
        'title':'Main page',
        'name':'pratiksha'
    });
});

app.get('/help',(req,res) =>{
    res.render('help',{
        'message':'Display your important message here',
        'title':'Help page',
        'name': 'pratiksha'
    })
});

app.get('/about',(req,res) =>{
    res.render('about',{
        'title':'About page',
        'name': 'pratiksha'
    })
})

app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    geocode(req.query.address,(error,{longitude,latitude,location} = {}) =>{
        if(error){
            return res.send({
                error:error
            })
        }

        
        forecast(longitude, latitude, (error,forecastData) =>{
           if(error){
               return res.send({
                   error:error
               })
           }
         //  console.log(JSON.stringify(data));

            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            });
       })
    })
   
})

app.get('/product',(req,res) =>{
    if(!req.query.search){
        return res.send({
            error:"Serach parameter is a required"
        })
    }
    console.log(req.query.search);
    res.send({
        product:[]
    })
})

app.get('/help/*', (req, res) =>{
    // res.send('Help article not found');
    res.render('404',{
        'title':'404',
        'name': 'pratiksha',
        'errorMsg':'Help article not found'
    })
})

app.get('*', (req, res) =>{
 //   res.send('My 404 page');
    res.render('404',{
        'title':'404',
        'name': 'pratiksha',
        'errorMsg':'Page Not Found'
    })
})

app.listen('3000',()=>{
    console.log('listemimg port 3000');
})