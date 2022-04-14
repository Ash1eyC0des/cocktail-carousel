//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

document.querySelector('button').addEventListener('click', getDrink)

function getDrink() {

    let drink = document.querySelector('input').value

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
    //   console.log(data.drinks[0])
    //   document.querySelector('h2').innerText = data.drinks[0].strDrink
    //   document.querySelector('img').src = data.drinks[0].strDrinkThumb
    //   const paragraph = document.createElement('p')
    //   document.querySelector('body').appendChild(paragraph).innerText = data.drinks[0].strInstructions

    //     for (let i = 1; data.drinks[0][`strIngredient${i}`] !== null; i++) {
    //         const listItem = document.createElement('li')
    //         listItem.innerText = data.drinks[0][`strIngredient${i}`]
    //         document.querySelector('ul').appendChild(listItem)
    //     }

    data.drinks.forEach((element, index) => {
        console.log(data.drinks[index])
        const container = document.querySelector('.slideshow-container')
        const div = document.createElement('div')
        const h2 = document.createElement('h2')
        const img = document.createElement('img')
        const ingredientsHead = document.createElement('h3')
        const ul = document.createElement('ul')
        const instructionsHead = document.createElement('h3')
        const paragraph = document.createElement('p')

        container.appendChild(div).classList.add('mySlides', 'fade', `index${index}`)
        const divIndex = document.querySelector(`.index${index}`)

        divIndex.appendChild(h2).innerText = data.drinks[index].strDrink
        divIndex.appendChild(img).src = data.drinks[index].strDrinkThumb
        divIndex.appendChild(ingredientsHead).innerText = 'Ingredients'
        divIndex.appendChild(ul)

        for (let i = 1; data.drinks[index][`strIngredient${i}`] !== null; i++) {
            const listItem = document.createElement('li')
            listItem.innerText = data.drinks[index][`strIngredient${i}`]
            ul.appendChild(listItem)
        }

        divIndex.appendChild(instructionsHead).innerText = 'Instructions'
        divIndex.appendChild(paragraph).innerText = data.drinks[index].strInstructions
    });
    
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}


var slideIndex = 1;

var myTimer;

var slideshowContainer;

window.addEventListener("load",function() {
    showSlides(slideIndex);
    myTimer = setInterval(function(){plusSlides(1)}, 4000);
  
    //COMMENT OUT THE LINE BELOW TO KEEP ARROWS PART OF MOUSEENTER PAUSE/RESUME
    // slideshowContainer = document.getElementsByClassName('slideshow-inner')[0];
  
    //UNCOMMENT OUT THE LINE BELOW TO KEEP ARROWS PART OF MOUSEENTER PAUSE/RESUME
    // slideshowContainer = document.getElementsByClassName('slideshow-container')[0];
  
    // slideshowContainer.addEventListener('mouseenter', pause)
    // slideshowContainer.addEventListener('mouseleave', resume)
})

// NEXT AND PREVIOUS CONTROL
function plusSlides(n){
  clearInterval(myTimer);
  if (n < 0){
    showSlides(slideIndex -= 1);
  } else {
   showSlides(slideIndex += 1); 
  }
  
  //COMMENT OUT THE LINES BELOW TO KEEP ARROWS PART OF MOUSEENTER PAUSE/RESUME
  
  if (n === -1){
    myTimer = setInterval(function(){plusSlides(n + 2)}, 4000);
  } else {
    myTimer = setInterval(function(){plusSlides(n + 1)}, 4000);
  }
}

//Controls the current slide and resets interval if needed
function currentSlide(n){
  clearInterval(myTimer);
  myTimer = setInterval(function(){plusSlides(n + 1)}, 4000);
  showSlides(slideIndex = n);
}

function showSlides(n){
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
//   dots[slides.length-1].className += " active";
}

pause = () => {
  clearInterval(myTimer);
}

resume = () =>{
  clearInterval(myTimer);
  myTimer = setInterval(function(){plusSlides(slideIndex)}, 4000);
}