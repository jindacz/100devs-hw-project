const express = require('express')
const app = express()
const PORT = 8000
const cors = require('cors')

app.use(cors())

const tea = {
    'oolong':{
        'type': 'black',
        'origin': 'test',
        'waterTemp':200,
        'caffineLevel':180,
        'caffinated': true,
        'flavor': 'delicious'
    },
    'green':{
        'type': 'green',
        'origin': 'test',
        'waterTemp':200,
        'caffineLevel':180,
        'caffinated': false,
        'flavor': 'delicious'
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
    const teaName = request.params.name.toLowerCase()
    if (tea[teaName]) {
        response.json(tea[teaName])
    }else{
        response.json(tea['unknown'])
    }
    response.json(tea)
})



app.listen(process.env.PORT || PORT, ()=>{
    console.log(`The server is running on ${PORT}`);
})