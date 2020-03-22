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
        data.meals.forEach(e=>{
            console.log(e)
            const paragraph = `<p>${e.strMeal}</p>`;
            resoult__wraper.innerHTML += paragraph;
            resoult__wraper.innerHTML += `<img class="thumbnail" src="${e.strMealThumb}" alt="${e.strMeal}" />`;
            resoult__wraper.innerHTML += `<a class="link" href="${e.strSource}">Link<a>`;
        })
    });
    fetch(`https://api.spoonacular.com/recipes/search?query=${search}&number=10&information&instructionsRequired=true&apiKey=${apiKey}`)
    .then(res=>res.json())
    .then(data=>{
        data.results.forEach(e=>{
            console.log(e)
            const paragraph = `<p>${e.title}</p>`;
            resoult__wraper.innerHTML += paragraph;
            resoult__wraper.innerHTML += `<img class="thumbnail" src="https://spoonacular.com/recipeImages/${e.id}-480x360.jpg" alt="${e.title}" />`;
            // resoult__wraper.innerHTML += `<a class="link" href="${e.strSource}">Link<a>`;
            fetch(`https://api.spoonacular.com/recipes/${e.id}/analyzedInstructions?apiKey=${apiKey}`)
            .then(res=>res.json())
            .then(data=>{
                data.forEach(steps=>{
                    steps.steps.forEach(step=>console.log(step))
                })
            })
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
            console.log(data.meals[0])
            const paragraph = `<p>${data.meals[0].strMeal}</p>`;
            resoult__wraper.innerHTML += paragraph;
            resoult__wraper.innerHTML += `<img class="thumbnail" src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMeal}" />`;
            resoult__wraper.innerHTML += `<a class="link" href="${data.meals[0].strSource}">Link<a>`;

        })
    });

