const request = require('request');

const forecast = (lat, long, callback)=>{
    const url = "https://api.darksky.net/forecast/183b3cdd947179f462055e745fdd9646/"+lat+","+long;

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to forecast services!',undefined);
        }
        else if(response.body.currently === 0){
            callback('Incorrect latitude and longitude given in the input search',undefined);
        }
        else{
            
            var data = JSON.parse(JSON.stringify(response.body));
            console.log(data.currently);
            callback(undefined,'It is currently '+data.currently.temperature+' degrees out. There is a '+data.currently.precipProbability+'% chance of rain.')
        }
    })
    
}

module.exports = forecast;