const request = require('request');

const geocode = (address, callback) =>{
    const mapURL ="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoicHJhdGlrc2hhLXNoZXQiLCJhIjoiY2s2ZGoyNnp6MW5kNjNocWJ4OWwyODRreiJ9.PUEVRkAhZDMIUy1lLZTOiQ";
    request({url:mapURL, json:true},(error,response) => {
        if(error){
            callback('Unable to connect to geolocation services!',undefined)
        }
        else if(response.body.features.length === 0){
            callback('Incorrect location given in the input search', undefined);
        }
        else{
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            }
            );
        }
    })
}

module.exports = geocode;