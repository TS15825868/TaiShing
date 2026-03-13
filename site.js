
async function loadProducts(){
 const grid=document.getElementById('products');
 if(!grid) return;
 const res=await fetch('products.json');
 const data=await res.json();
 data.forEach(p=>{
   const d=document.createElement('div');
   d.className='card';
   d.innerHTML=`<img src="${p.image}"><h3>${p.name}</h3><p>${p.desc}</p><p>${p.sizes.join(' / ')}</p>`;
   grid.appendChild(d);
 });
}
document.addEventListener('DOMContentLoaded',loadProducts);
