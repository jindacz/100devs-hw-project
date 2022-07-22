// server.js
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://kurisuuu:511167@cluster0.tgpmqis.mongodb.net/?retryWrites=true&w=majority'

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))
// Our server doesn’t accept JSON data yet. We can teach it to read JSON by adding the body-parser’s json middleware.
app.use(bodyParser.json())
// we have to tell Express to make this public folder accessible to the public by using a built-in middleware called express.static
app.use(express.static('public'))

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    // if (err) return console.error(err)
    console.log('Connected to Database')
    // changing the database
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    app.set('view engine', 'ejs')

    app.get('/', (req, res) => {
      const cursor = db.collection('quotes').find()
      console.log(cursor)
      // we can use toArray to convert the data into an array.
      db.collection('quotes').find().toArray()
        .then(results => {
          res.render('index.ejs', { quotes: results })
        })
        .catch(error => console.error(error))
      
      
      // res.sendFile(__dirname + '/index.html')
      // Note: __dirname is the current directory you're in. Try logging it and see what you get!
      // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
    })

    app.post('/quotes', (req, res) => {
      console.log(req.body)
      // We can use the insertOne method to add items into a MongoDB collection
      quotesCollection.insertOne(req.body)
        .then(result => {
          // Let’s ask the browser to redirect back to / instead. We do this with res.redirect.
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })
    
    app.put('/quotes', (req, res) => {
      // console.log(req.body)
      quotesCollection.findOneAndUpdate(
        // query lets us filter the collection with key-value pairs. If we want to filter quotes to those written by Yoda
        { name: 'Yoda' }, 
        // We will use the $set operator since we’re changing Yoda’s quotes into Darth Vadar’s quotes:
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote
          }
        },
        // options tells MongoDB to define additional options for this update request.
        {
          upsert: true
        }
      )
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        window.location.reload(true)
      })
        .catch(error => console.error(error))
    })

    // We can then handle the event on our server side with the delete method:
    app.delete('/quotes', (req, res) => {
      quotesCollection.deleteOne(
        { name: 'Darth Vadar' }
      )
        .then(result => {
          result => {
            if (result.deletedCount === 0) {
              return res.json('No quote to delete')
            }
            res.json(`Deleted Darth Vadar's quote`)
          }
        })
        .catch(error => console.error(error))
    })

    app.listen(3001, function () {
      console.log('listening on 3001');
    })

  })
  .catch(error => console.error(error))

