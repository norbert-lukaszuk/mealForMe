const app__name = document.getElementById('app__name');
const form = document.getElementById('form');
const resoult__wraper = document.getElementById('resoult__wraper');
const random__button = document.getElementById('random__button');
const apiKey = '8125b5fc0f034ef1869347654bb52146';

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
            const meal = `<div class="meal"data-id=${recipe.idMeal}><p>${recipe.strMeal}</p><a class="link" href="${recipe.strSource}"><img class="thumbnail" src="${recipe.strMealThumb}" alt="${recipe.strMeal}"/><a></div>`;    
            console.log(e)
            // const paragraph = `<p>${e.strMeal}</p>`;
            resoult__wraper.innerHTML += meal;
            // resoult__wraper.innerHTML += `<img class="thumbnail" src="${e.strMealThumb}" alt="${e.strMeal}" />`;
            // resoult__wraper.innerHTML += `<a class="link" href="${e.strSource}">Link<a>`;
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
            const meal = `<div class="meal" data-id=${recipe.id}><p>${recipe.title}</p><a class="link" href="${recipe.sourceUrl}"><img class="thumbnail" src="https://spoonacular.com/recipeImages/${recipe.id}-480x360.jpg" alt="${recipe.title}"/><a></div>`;
            resoult__wraper.innerHTML += meal;
            // resoult__wraper.innerHTML += `<img class="thumbnail" src="https://spoonacular.com/recipeImages/${e.id}-480x360.jpg" alt="${e.title}" />`;
            // resoult__wraper.innerHTML += `<a class="link" href="${e.sourceUrl}">Link<a>`;
           
        })
    });
})
random__button.addEventListener('click', e=>{
    e.preventDefault();
    resoult__wraper.innerHTML = '';
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res=>res.json())
    .then(data=>{
        
        // data.meals.forEach(e=>{
            const recipe = data.meals[0];
            const meal = `<div class="meal"><p>${recipe.strMeal}</p><a class="link" href="${recipe.strSource}"><img class="thumbnail" src="${recipe.strMealThumb}" alt="${recipe.strMeal}"/><a></div>`;
            resoult__wraper.innerHTML += meal;
            // resoult__wraper.innerHTML += `<img class="thumbnail" src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMeal}" />`;
            // resoult__wraper.innerHTML += `<a class="link" href="${data.meals[0].strSource}">Link<a>`;

        })
    fetch(`https://api.spoonacular.com/recipes/random?number=1&apiKey=${apiKey}`)
        .then(res=>res.json())
        .then(data=>{
            const recipe = data.recipes[0];
            const meal = `<div class="meal"><p>${recipe.title}</p><a class="link" href="${recipe.sourceUrl}"><div class="meal__info"><p>${recipe.title}</p></div><img class="thumbnail" src="https://spoonacular.com/recipeImages/${recipe.id}-480x360.jpg" alt="${recipe.title}"/><a></div>`;
            resoult__wraper.innerHTML += meal;
            // resoult__wraper.innerHTML += `<img class="thumbnail" src="https://spoonacular.com/recipeImages/${recipe.id}-480x360.jpg" alt="${recipe.title}" />`;
            // resoult__wraper.innerHTML += `<a class="link" href="${recipe.sourceUrl}">Link<a>`;
        
        });
    });
    // selcting single meal from resoults
resoult__wraper.addEventListener('click', e=>{
    const mealId = e.path.find(element=>{
     if(element.classList.contains('meal')){
         return element.getAttribute('data-id')
     }
     else{false}   
    })
    console.log(mealId.getAttribute('data-id'));
})
