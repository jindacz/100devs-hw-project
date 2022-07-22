//Dog Stuff

document.querySelector('button').addEventListener('click', getFetchDogFacts)

function getFetchDogFacts(){
  let dogCode = document.querySelector('#dogCode').value
  const url = `https://http.dog/${dogCode}.jpg`
  document.querySelector('#dogImage').src= url;

  // fetch(url)
  //     .then(res => res.json()) // parse response as JSON
  //     .then(data => {
  //       console.log(data)

  //     })
  //     .catch(err => {
  //         console.log(`error ${err}`)
  //         alert('Wrong number please re-enter 101,102, 201, 202, etc');
  //         document.querySelector('#choice').value = "";
  //     });
}

//Example fetch using pokemonapi.co
//Pokemon stuff
document.querySelector('#getPokemon').addEventListener('click', getPokemon)

function getPokemon() {
  const choice = document.querySelector('#choice').value
  const url = 'https://pokeapi.co/api/v2/pokemon/' + choice
 
  if (url != 'https://pokeapi.co/api/v2/pokemon/'){
    fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        displayPokemon(data);
      })
      .catch(err => {
        console.log(`error ${err}`)
        alert('Wrong name please re-enter');
        document.querySelector('#choice').value="";
      });
    }else alert('Enter Pokemon Name')
}

function displayPokemon(data){
  document.querySelector('#pokeName').innerHTML = data.name;
  document.querySelector('#pokeImgFront').src = data.sprites.front_default;
  document.querySelector('#pokeImgBack').src = data.sprites.back_default;
  document.querySelector('#pokeType').innerHTML = data.types[0].type.name + ", " + data.types[1].type.name
  let url = data.types[0].type.url;

  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}



// 25a1336e-c2bf-4d01-a829-ec52bbf566e8 Harvard API Key
// https://github.com/harvardartmuseums/api-docs
// https://api.harvardartmuseums.org/RESOURCE_TYPE?apikey=YOUR_API_KEY
// https://api.harvardartmuseums.org/RESOURCE_TYPE?apikey=25a1336e-c2bf-4d01-a829-ec52bbf566e8
// https://api.harvardartmuseums.org/object?person=${choice}?apikey=25a1336e-c2bf-4d01-a829-ec52bbf566e8
// https://api.harvardartmuseums.org/object?person=33430
document.querySelector('#getLogo').addEventListener('click', getArt)

function getArt() {
  const choice = document.querySelector('#artID').value
  const url = `https://api.harvardartmuseums.org/object?person=${choice}&apikey=25a1336e-c2bf-4d01-a829-ec52bbf566e8`

  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      if(data.records.length>0){
        listArt(data);
      }else {
        alert('invalid number');
        document.querySelector('#artID').value=''
      }
    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}


function listArt(data){
  document.querySelector('h2.artName').innerHTML = data.records[0].title;
  document.querySelector('img.artImg').src = data.records[0].primaryimageurl;
  document.querySelector('h3.artist').innerHTML = data.records[0].people[0].name + " " + data.records[0].people[0].displaydate+"<br>Provenance:"+data.records[0].provenance;
    
}


//Google Books API
//https://developers.google.com/books/docs/v1/using
//AIzaSyAfT7BkFKUyaKPyNGIbfMg3dVSlkuwGLi4
//Use this key in your application by passing it with the key=API_KEY parameter.
//https://www.googleapis.com/books/v1/volumes?q=flowers&orderBy=newest&key=yourAPIKey
//https://www.googleapis.com/books/v1/volumes?q=flowers&projection=lite&key=yourAPIKey
//https://www.googleapis.com/books/v1/volumes?q=flowers&projection=lite&key=AIzaSyAfT7BkFKUyaKPyNGIbfMg3dVSlkuwGLi4


document.querySelector('#getBook').addEventListener('click', getBook)

function getBook() {
  const choice = document.querySelector('#bookSearch').value
  let searchParam = choice.split(" ").join("&")
  console.log(searchParam)
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchParam}=lite&orderBy=relevance&key=AIzaSyAfT7BkFKUyaKPyNGIbfMg3dVSlkuwGLi4`

  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      document.querySelector('#imgBook').src = data.items[0].volumeInfo.imageLinks.thumbnail;
      document.querySelector('#bookDetails').innerHTML = data.items[0].volumeInfo.description;
      document.querySelector('#bookTitle').innerHTML = data.items[0].volumeInfo.title;
    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}


