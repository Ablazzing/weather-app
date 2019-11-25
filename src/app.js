const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const {PythonShell} = require('python-shell');


const app = express()

const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address,(geo_error,geo_data)=>{
        if (geo_error){res.send({geo_error }) }
        else {
            
     forecast(geo_data.longitude, geo_data.latitude,(error,data)=>{
        if (error){res.send({error })}
        else {    res.send({location:geo_data.location, forecast: data })}
    })

    

        }
    })

})




// app.get('/python',(req,res)=>{
        
//     const fs = require('fs')
//     resolve = require('path').resolve()
//     console.log(resolve)

//     var options = {
//     mode: 'text',
//     pythonPath: 'C:/python3_7/python.exe',
//     pythonOptions: ['-u'],
//     scriptPath: './python',
//     args: ['11']
//     };

//     PythonShell.run('1.py', options, function (err, results) {
//     if (err) 
//         throw err;
//     // Results is an array consisting of messages collected during execution
//     const data = JSON.parse( fs.readFileSync('./response.json'))
//     console.log(data)
//     });
// })

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})