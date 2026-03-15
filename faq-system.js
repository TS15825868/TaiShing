(function(){

const container=document.querySelector(".faq-list");
if(!container || typeof FAQ_DATA==="undefined") return;

let html="";

FAQ_DATA.forEach(f=>{

html+=`

<div class="faq-item">

<button class="faq-q">${f.q}</button>

<div class="faq-a">

${f.a}

</div>

</div>

`;

});

container.innerHTML=html;



/* 折疊動畫 */

document.querySelectorAll(".faq-q").forEach(btn=>{

btn.addEventListener("click",function(){

const a=this.nextElementSibling;

if(a.style.maxHeight){

a.style.maxHeight=null;

}else{

a.style.maxHeight=a.scrollHeight+"px";

}

});

});



/* 生成 schema */

const schema={

"@context":"https://schema.org",
"@type":"FAQPage",
"mainEntity":[ ]

};

FAQ_DATA.forEach(f=>{

schema.mainEntity.push({

"@type":"Question",
"name":f.q,
"acceptedAnswer":{
"@type":"Answer",
"text":f.a
}

});

});

const script=document.createElement("script");

script.type="application/ld+json";

script.text=JSON.stringify(schema);

document.body.appendChild(script);

})();
