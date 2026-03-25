(function(){

function openLine(msg){
  window.open("https://lin.ee/sHZW7NkR?text="+encodeURIComponent(msg));
}
window.openLine=openLine;

function toggleMenu(){
  document.getElementById("menuOverlay").classList.toggle("active");
}
window.toggleMenu=toggleMenu;

/* AI推薦 */
function startAI(){
  document.getElementById("aiBox").innerHTML=`
  <h3>你的狀態</h3>
  <button onclick="pick('start')">入門</button>
  <button onclick="pick('daily')">日常</button>
  <button onclick="pick('pro')">完整</button>
  `;
}
window.startAI=startAI;

function pick(type){
  let result="";

  if(type==="start") result="建議：龜鹿膏 或 龜鹿飲";
  if(type==="daily") result="建議：龜鹿膏＋龜鹿湯塊";
  if(type==="pro") result="建議：完整搭配（膏＋飲＋湯塊＋鹿茸粉）";

  document.getElementById("aiBox").innerHTML=`
    <h3>推薦結果</h3>
    <p>${result}</p>
    <button onclick="openLine('依照推薦幫我搭配')">👉 LINE詢問</button>
  `;
}

/* 產品彈窗 */
function openProduct(name){
  const m=document.getElementById("modal");

  m.innerHTML=`
  <div class="modal-box">

    <div onclick="closeModal()">✕</div>

    <h2>${name}</h2>

    <p>日常飲食補養使用</p>

    <ul>
      <li>建立日常習慣</li>
      <li>依飲食搭配使用</li>
    </ul>

    <button onclick="openLine('我想了解${name}')">
      👉 官方 LINE 諮詢
    </button>

  </div>
  `;

  m.style.display="flex";
}
window.openProduct=openProduct;

function closeModal(){
  document.getElementById("modal").style.display="none";
}

/* 漢堡 */
document.addEventListener("DOMContentLoaded",()=>{
  document.getElementById("menuOverlay").innerHTML=`
  <a onclick="openLine('幫我搭配')">LINE諮詢</a>
  <a href="product.html">產品</a>
  `;
});

})();
