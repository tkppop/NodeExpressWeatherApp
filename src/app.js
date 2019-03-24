const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//define port Heroku and local
const port = process.env.PORT || 3000

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Prasanna Krishnan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Prasanna Krishnan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Prasanna Krishnan'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        // express usage is to use return res.send for validation cases.
        return res.send({
            error: 'No address was sent, address must be provided.'
        })
    }
    geocode(req.query.address,(error,response)=>{
        if(error) {
            return res.send({
                error
            })
        }
        forecast(response.latitude,response.longitude,(error, forecastData)=>{
            if(error) {
                return res.send({
                    error
                })
            } else {
                res.send({
                    forecast: forecastData,
                    location: response.location,
                    address: req.query.address
                })
            }
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Prasanna Krishnan',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Prasanna Krishnan',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})