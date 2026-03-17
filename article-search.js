const input = document.getElementById("article-search");
const grid = document.getElementById("article-grid");

if(input && grid){

input.addEventListener("input",()=>{

const q = input.value.trim().toLowerCase();

const list = ARTICLES.filter(a=>{

return (
a.title.toLowerCase().includes(q) ||
(a.summary && a.summary.toLowerCase().includes(q)) ||
(a.tags && a.tags.join("").includes(q))
);

});

renderGrid(list);

});

}

function renderGrid(list){

grid.innerHTML = "";

list.forEach(a=>{

grid.innerHTML += `
<a href="articles/${a.url}" class="product-card">
<img src="${a.image}">
<h3>${a.title}</h3>
<p>${a.summary}</p>
</a>
`;

});

}
