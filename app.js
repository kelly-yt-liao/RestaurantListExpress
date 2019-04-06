
// require packages used in the project
const express = require('express')

const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')
// create a variable to store movie infos
const placeList = require('./restaurants.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting fro the existing files
app.use(express.static('public'))

// routes setting using index template with replicate partial template content.
app.get('/', (req, res) => {
  // past the restaurant data into 'index' partial template
  res.render('index', { places: placeList.results })
})

app.get('/places/:place_id', (req, res) => {
  const place = placeList.results.filter(
    place => place.id == req.params.place_id
  )
  res.render('show', { place: place[0] })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  console.log(keyword)
  const places = placeList.results.filter(place => {
    return place.name.toLowerCase().includes(keyword.toLowerCase()) ||
      place.name_en.toLowerCase().includes(keyword.toLowerCase()) ||
      place.category.includes(keyword)
  })

  res.render('index', { places: places, keyword: keyword })
})

// ********* Comment areas with the replacing part from original code version.******* //
// // routes setting using index template.
// app.get('/', (req, res) => {
//   res.render('index')  // In order to import the index.handlebars template, we have to change the res.send() into res.render() inside app.get() here
// })

// // original routes setting without importing the template engine
// app.get('/', (req, res) => {
//   res.send('This is my movie list built with Express')
// })
// **************************** Comment areas - END ********************************* //

// start and listen on the Express server from a port at local side
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})


