
document.addEventListener("DOMContentLoaded",()=>{

if(typeof ARTICLES==="undefined") return;

const current=location.pathname.split("/").pop();

/* related */
const related=document.getElementById("related-articles");

if(related){

let html="";

ARTICLES.filter(a=>a.url!==current).slice(0,3).forEach(a=>{

html+=`
<a href="${a.url}" class="product-card">

<img
src="../${a.image}"
alt="${a.title}"
loading="lazy"
onerror="this.src='../images/logo-seal.png';this.classList.add('img-placeholder');"
>

<h3>${a.title}</h3>

<p>${a.summary}</p>

</a>
`;

});

related.innerHTML=html;

}

/* popular */

const popular=document.getElementById("popular-articles");

if(popular){

let html="";

ARTICLES.filter(a=>a.popular).slice(0,3).forEach(a=>{

html+=`
<a href="${a.url}" class="product-card">

<img
src="../${a.image}"
alt="${a.title}"
loading="lazy"
onerror="this.src='../images/logo-seal.png';this.classList.add('img-placeholder');"
>

<h3>${a.title}</h3>

<p>${a.summary}</p>

</a>
`;

});

popular.innerHTML=html;

}

/* latest */

const latest=document.getElementById("latest-articles");

if(latest){

let html="";

ARTICLES.sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,3).forEach(a=>{

html+=`
<a href="${a.url}" class="product-card">

<img
src="../${a.image}"
alt="${a.title}"
loading="lazy"
onerror="this.src='../images/logo-seal.png';this.classList.add('img-placeholder');"
>

<h3>${a.title}</h3>

<p>${a.summary}</p>

</a>
`;

});

latest.innerHTML=html;

}

});
