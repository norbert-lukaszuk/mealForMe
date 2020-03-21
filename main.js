const app__name = document.getElementById('app__name');
const form = document.getElementById('form');
const resoult__wraper = document.getElementById('resoult__wraper');

form.addEventListener('submit',e=>{
    e.preventDefault();
    const search = form.meal__search.value;
    form.reset();
    const paragraph = `<p>${search}</p>`;
    resoult__wraper.innerHTML += paragraph;
})