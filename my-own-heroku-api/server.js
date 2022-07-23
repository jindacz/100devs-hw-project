const express = require('express')
const app = express()
const PORT = 8000
const cors = require('cors')

app.use(cors())

const fruit = {
    'apple':{
        'color': 'red',
        'size': 'small',
        'flavor': 'good',
        'touch': 'hard'
    },
    'banana':{
        'color': 'yellow',
        'size': 'medium',
        'flavor': 'good',
        'touch': 'soft'
    },
    'unknown':{
        'type': 'unknown',
        'origin': 'unknown',
        'waterTemp':0,
        'caffineLevel':0,
        'caffinated': false,
        'flavor': 'unknown'
    }
}

app.get('/', (req, rep) => {
    rep.sendFile(__dirname + '/index.html')
})

app.get('/api/:name', (request, response) => {
    const fruitName = request.params.name.toLowerCase()
    if (fruit[fruitName]) {
        response.json(fruit[fruitName])
    }else{
        response.json(fruit['unknown'])
    }
    response.json(fruit)
})



app.listen(process.env.PORT || PORT, ()=>{
    console.log(`The server is running on ${PORT}`);
})