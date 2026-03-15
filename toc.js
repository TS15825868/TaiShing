
document.addEventListener("DOMContentLoaded",()=>{

const article=document.querySelector("article");

if(!article) return;

const headings=article.querySelectorAll("h2");

if(!headings.length) return;

let toc="<div class='toc'><h3>文章目錄</h3><ul>";

headings.forEach((h,i)=>{

const id="section-"+i;
h.id=id;

toc+=`<li><a href="#${id}">${h.textContent}</a></li>`;

});

toc+="</ul></div>";

article.insertAdjacentHTML("afterbegin",toc);

});
