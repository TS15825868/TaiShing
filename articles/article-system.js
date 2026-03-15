document.addEventListener("DOMContentLoaded",()=>{

if(typeof ARTICLES==="undefined") return;

const slug=location.pathname.split("/").pop();

const article=ARTICLES.find(a=>a.url===slug);

if(!article) return;

document.getElementById("title").textContent=article.title;

document.getElementById("summary").textContent=article.summary;

document.getElementById("article-title").textContent=article.title+"｜仙加味";

document.getElementById("article-desc").setAttribute(
"content",
article.summary
);

let html="";

article.sections.forEach(sec=>{

html+=`

<h2>${sec.title}</h2>

<p>${sec.text}</p>

`;

});

document.getElementById("content").innerHTML=html;

});
