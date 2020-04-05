const request = require('request');

const forecast = (lat, long, callback)=>{
    const url = "https://api.darksky.net/forecast/183b3cdd947179f462055e745fdd9646/"+lat+","+long;

    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to forecast services!',undefined);
        }
        else if(body.error === 0){
            callback('Incorrect latitude and longitude given in the input search',undefined);
        }
        else{
            
           // var data = JSON.parse(JSON.stringify(response.body));
            //console.log(JSON.stringify(body));
           callback(undefined,'It is currently '+body.currently.temperature+' degrees out.This high today with '+body.daily.data[0].temperatureHigh+' low of '+body.daily.data[0].temperatureLow+'. There is a '+body.currently.precipProbability+'% chance of rain.')
        }
    })
    
}

module.exports = forecast;