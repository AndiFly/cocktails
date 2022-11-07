if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
} else {
  window.onbeforeunload = function () {
      window.scrollTo(0, 0);
  }
}

document.querySelector("a").addEventListener("click", getDrink)
// document.querySelector('#next').addEventListener("click", nextDrink)
document.querySelector('#searchbar').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    getDrink()
  }
});

function getDrink(){
  document.querySelector('ul').innerHTML = ''
  let counter = 0
  let drink = document.querySelector('input').value
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
  .then((response) => response.json())
  .then(data => {
    console.log(data)
    document.querySelector('img').src = data.drinks[counter].strDrinkThumb
    document.querySelector('h2').innerText = data.drinks[counter].strDrink
    document.querySelector('p').innerHTML = data.drinks[counter].strInstructions
    let obj = data.drinks[counter]
    let ingredients = 1
    for(let el in obj){
      if(obj[`strIngredient${ingredients}`]){
        const li = document.createElement('li')
        if(obj[`strMeasure${ingredients}`]){
          li.textContent = obj[`strMeasure${ingredients}`] + " " + obj[`strIngredient${ingredients}`]
        }else li.textContent = obj[`strIngredient${ingredients}`]
        
        document.querySelector('ul').appendChild(li)
        ingredients += 1  
      }
      
    }
    console.log(data.drinks[counter][`strIngredient${ingredients}`])
   
  });
}

// function nextDrink(){
//   counter += 1;
//   let drink = document.querySelector('input').value
//   fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
//   .then((response) => response.json())
//   .then(data => {
//     console.log(data)
//     document.querySelector('img').src = data.drinks[counter].strDrinkThumb
//     document.querySelector('h2').innerHTML = data.drinks[counter].strDrink
//     document.querySelector('h3').innerHTML = data.drinks[counter].strInstructions
//     document.querySelector('#ingredient1').innerHTML = data.drinks[counter].strIngredient1
//     document.querySelector('#ingredient2').innerHTML = data.drinks[counter].strIngredient2
//     document.querySelector('#ingredient3').innerHTML = data.drinks[counter].strIngredient3
//     document.querySelector('#ingredient4').innerHTML = data.drinks[counter].strIngredient4
//     document.querySelector('#ingredient5').innerHTML = data.drinks[counter].strIngredient5
//     document.querySelector('#ingredient6').innerHTML = data.drinks[counter].strIngredient6
//     document.querySelector('#ingredient7').innerHTML = data.drinks[counter].strIngredient7
//     document.querySelector('#ingredient8').innerHTML = data.drinks[counter].strIngredient8
//   });
// }
