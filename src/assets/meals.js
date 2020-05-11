export function mealDb_search(id, title, link, image){
    const meal = `<div class="meal" data-id=${id} api-id="mealDB">
            <p>${title}</p>
                <div class="meal__icons"><a class="link" href="${link}"><i class="fas fa-external-link-alt fa-2x"></i></a><i class="fas fa-list-ul fa-2x"></i><i class="far fa-save fa-2x"></i></div>
                <img class="thumbnail" src="${image}" alt="${title}"/>
            </div>`;
            return meal
}
export function mealSpoonSearch(id, title, sourceUrl){
    const meal = `<div class="meal" data-id=${id} api-id="spoon">
            <p>${title}</p>
                <div class="meal__icons"><a class="link" href="${sourceUrl}"><i class="fas fa-external-link-alt fa-2x"></i></a><i class="fas fa-list-ul fa-2x"></i><i class="far fa-save fa-2x"></i></div>
                <img class="thumbnail" src="https://spoonacular.com/recipeImages/${id}-480x360.jpg" alt="${title}"/>
            </div>`;
        return meal

}