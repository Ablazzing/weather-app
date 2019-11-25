const request = require('request')

function forecast(lon,lat,callback){
    const darksky_key ='a91a95d25e3c9837bd20d8da756511c3'
    const darksky_url = `https://api.darksky.net/forecast/${darksky_key}/${lat},${lon}`

    request({url:darksky_url,json:true},(error,{body})=>{
        if (error){
            callback('Connection problems',undefined)
        } else if (body.error){
            callback('There is no data with this lat and lon')
        }
         else {
            callback(undefined,body.daily.data[0])}

    })
}

// forecast_data = forecast(geocode_data.longitude, geocode_data.latitude,(error,data)=>{
//     if (error){return error}
//     return data
// })
// console.log(forecast_data)

module.exports = forecast