const { request } = require('express')
const express = require('express')
// when you see app, app is just express
const app = express()
const PORT = 8000

const rappers = {
    '21 savage': {
        'age': 29,
        'birthName': 'test',
        'birthLocation': 'London, England'
    },
    'chance the rapper': {
        'age': 29,
        'birthName': 'test',
        'birthLocation': 'Chicago, Illinois'
    },
    'dylan': {
        'age': 29,
        'birthName': 'Dylan',
        'birthLocation': 'Dylan'
    }
}

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

// column is query parameter
app.get('/api/:rapperName', (request, response) => {
    console.log(request.params.rapperName); 
    // response.json(rappers)
    const rapperName = request.params.rapperName.toLowerCase()
    // if rapper pass in params exist, respond with json
    if(rappers[rapperName]){
        response.json(rappers[rapperName])
    }else{
        response.json(rappers['dylan'])
    }
})

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
})
