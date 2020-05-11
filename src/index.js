const apiKey = '8125b5fc0f034ef1869347654bb52146';
const app__name = document.getElementById('app__name');
const form = document.getElementById('form');
const ingredient__list = document.getElementById('ingredient__list');
const resoult__wraper = document.getElementById('resoult__wraper');
const random__button = document.getElementById('random__button');
import './style.scss';
import {mealDb_search, mealSpoonSearch} from './assets/meals';
form.addEventListener('submit',e=>{
    e.preventDefault();
    const search = form.meal__search.value;
    form.reset();
    resoult__wraper.innerHTML = '';
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then(res=>res.json())
    .then(data=>{
        const ids = data.meals.map(e=> e.idMeal);//mapowanie tablicy aby pozyskać tablice z id posiłku
        console.log("ids", ids);
        
        data.meals.forEach(e=>{
            const recipe = e;
            const meal = mealDb_search(recipe.idMeal, recipe.strMeal, recipe.strSource, recipe.strMealThumb);
            resoult__wraper.innerHTML += meal;
        })
    })
    .catch(err=>console.log(err));

    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${search}&instructionsRequired=true&addRecipeInformation=true&apiKey=${apiKey}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data, typeof(data.results));
        const ids = data.results.map(e=> e.id)
        console.log(ids);
        data.results.forEach(e=>{
            console.log(e)
            const recipe = e;
            const meal = mealSpoonSearch(recipe.id, recipe.title, recipe.sourceUrl);
            resoult__wraper.innerHTML += meal;
           
        })
    });
})
random__button.addEventListener('click', e=>{
    e.preventDefault();
    resoult__wraper.innerHTML = '';
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res=>res.json())
    .then(data=>{

        const recipe = data.meals[0];
        const meal = mealDb_search(recipe.idMeal, recipe.strMeal, recipe.strSource, recipe.strMealThumb);
        resoult__wraper.innerHTML += meal;

        })
    fetch(`https://api.spoonacular.com/recipes/random?number=1&apiKey=${apiKey}`)
        .then(res=>res.json())
        .then(data=>{
            const recipe = data.recipes[0];
            const meal = mealSpoonSearch(recipe.id, recipe.title, recipe.sourceUrl);
            resoult__wraper.innerHTML += meal;
            
        });
    });
    // selcting single meal from resoults
resoult__wraper.addEventListener('click', e=>{
    if(e.target.classList.contains('fa-list-ul')){
        console.log(e.target.parentElement.parentElement);
    const mealId = e.target.parentElement.parentElement.getAttribute('data-id');
    const mealApi = e.target.parentElement.parentElement.getAttribute('api-id');
    console.log(mealId, mealApi);
    if(mealApi==='mealDB'){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data.meals[0]);
        let arr = [];
        for(let i=1; i<20; i++){
            if(data.meals[0][`strIngredient${i}`]){
            arr.push(`${data.meals[0][`strIngredient${i}`]} : ${data.meals[0][`strMeasure${i}`]}`)
            }
         }
         console.log(arr);
         ingredient__list.innerHTML = '';
         ingredient__list.className = 'ingredient__list--hide';
         ingredient__list.innerHTML +='<i class="far fa-times-circle fa-2x" id="close"></i>';
         ingredient__list.innerHTML +=`<img class="thumbnail" src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMeal}"/>`;
         ingredient__list.innerHTML += `<h3>${data.meals[0].strMeal}</h3>`;
         arr.forEach(e=>{
             const ingredient = `<p class="ingredient">${e}</p>`
             ingredient__list.innerHTML += ingredient;
             ingredient__list.className = 'ingredient__list'
         })
         window.scroll(0,200);
         const close = document.getElementById('close');
         close.addEventListener('click', e=>{
             e.target.parentElement.innerHTML = '';
             ingredient__list.className = 'ingredient__list--hide';

         })

    })
}
if(mealApi==='spoon'){
    fetch(`https://api.spoonacular.com/recipes/${mealId}/information?apiKey=${apiKey}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        const ingredients = data.extendedIngredients;
        console.log('my console log: ingredients', ingredients)
        
        ingredient__list.innerHTML = '';
        ingredient__list.className = 'ingredient__list--hide';
        ingredient__list.innerHTML += '<i class="far fa-times-circle fa-2x" id="close"></i>';
        ingredient__list.innerHTML += `<img class="thumbnail" src="${data.image}" alt="${data.title}">`
        ingredient__list.innerHTML += `<h3>${data.title}</h3>`;
        ingredient__list.className = 'ingredient__list';
        ingredients.forEach(e=>{
            const ingredient = document.createElement('p');
            ingredient.className = 'ingredient';
            ingredient.innerText = `${e.name} - ${e.amount} ${e.unit}`;
            ingredient__list.appendChild(ingredient);

        })
        window.scroll(0,200);
        const close = document.getElementById('close');
             close.addEventListener('click', e=>{
                 e.target.parentElement.innerHTML = '';
                 ingredient__list.className = 'ingredient__list--hide';
    
             })
    })
}

}
    else{console.log('false')}
})