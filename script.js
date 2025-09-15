const searchForm=document.querySelector('form');
const searchInput=document.querySelector('#search');
const resultsList=document.querySelector('#results');

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    searchRecipes();
})

async function searchRecipes() {
    const searchValue = searchInput.value.trim();
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchValue}&app_id=b12c6dbf&app_key=5e2db198967ef53bb4cd4529ac0b44b7`);
    const data = await response.json();
    displayRecipes(data.hits);
}

function displayRecipes(recipes)
{
    let html='';
    recipes.forEach((recipe)=>
    {
        html+=`
        <div>
        <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
        <h3>${recipe.recipe.label}</h3>
        <ul>
        ${recipe.recipe.ingredientLines.map(ingredient=>`<li>${ingredient}</li>`).join('')}
        </ul>
        <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
        </div>
        `
    })
    resultsList.innerHTML=html;
}
