//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('button').addEventListener('click', getDrink)

let input = document.querySelector('input')

function getDrink(){
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input.value.replace(" ", "_")}`

    fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      let arr = []
      arr.push(data.drinks)
      // console.log(arr)
      
      let drinkList = []
      data.drinks.forEach(element => {
        drinkList.push(element)
      });
      
      drinkList.sort((el1, el2) => Math.random() - Math.random())
      document.querySelector('h2').innerText = drinkList[0].strDrink
      document.querySelector('img').src = drinkList[0].strDrinkThumb
      document.querySelector('h3').innerText = drinkList[0].strInstructions
    })
    .catch(err => {
        console.log(`error ${err}`)
    });

}

