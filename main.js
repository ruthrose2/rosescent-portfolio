// ===== PRODUCT DATA: edit names, prices (USD), categories and photos here =====
const PRODUCTS=[
{name:"Rose Noir",cat:"Perfume",price:45,img:"images/product1.svg",desc:"Deep rose with a warm musk base."},
{name:"Velvet Petal",cat:"Perfume",price:38,img:"images/product2.svg",desc:"Soft peony, vanilla and cashmere."},
{name:"Amber Dusk",cat:"Perfume",price:52,img:"images/product3.svg",desc:"Amber, sandalwood and a hint of spice."},
{name:"Citrus Bloom",cat:"Body mist",price:18,img:"images/product4.svg",desc:"Fresh orange blossom, light and sparkling."},
{name:"Rose Garden Mist",cat:"Body mist",price:20,img:"images/product5.svg",desc:"Everyday rose mist for all-day freshness."},
{name:"Signature Gift Set",cat:"Gift set",price:75,img:"images/product6.svg",desc:"Perfume, body mist and travel spray in a box."}];
const EMAIL="roseruthnalubega@gmail.com";
const usd=n=>"$"+n.toFixed(2)+" USD";

// Footer year
const yr=document.getElementById("yr");if(yr)yr.textContent=new Date().getFullYear();

// Mobile menu
const b=document.getElementById("burger"),menu=document.getElementById("menu");
if(b)b.addEventListener("click",()=>{const o=menu.classList.toggle("open");b.setAttribute("aria-expanded",o)});

// Product cards
let cart={};
function card(p,i,btn){return `<article class="card"><img src="${p.img}" alt="${p.name} by Rosecents" loading="lazy"><div class="in"><small>${p.cat}</small><h3>${p.name}</h3><p>${p.desc}</p><div class="row"><span class="price">${usd(p.price)}</span>${btn?`<button class="btn" data-i="${i}">Add</button>`:""}</div></div></article>`}

// Home page: first 3 products
const feat=document.getElementById("featured");
if(feat)feat.innerHTML=PRODUCTS.slice(0,3).map((p,i)=>card(p,i,false)).join("");

// Products page: grid, filters, cart
const list=document.getElementById("products");
function draw(f="all"){list.innerHTML=PRODUCTS.map((p,i)=>p.cat===f||f==="all"?card(p,i,true):"").join("")}
function updateCart(){
  const items=Object.entries(cart),box=document.getElementById("cart");
  if(!items.length){box.hidden=true;return}
  let total=0,count=0,lines=[];
  items.forEach(([i,q])=>{const p=PRODUCTS[i];total+=p.price*q;count+=q;lines.push(`${q} x ${p.name} (${usd(p.price*q)})`)});
  box.hidden=false;
  document.getElementById("cartInfo").textContent=`${count} item(s): ${usd(total)}`;
  document.getElementById("orderBtn").href=`mailto:${EMAIL}?subject=${encodeURIComponent("Order from Rosecents website")}&body=${encodeURIComponent("Hello Rosecents, I would like to order:\n\n"+lines.join("\n")+"\n\nTotal: "+usd(total)+"\n\nMy name:\nMy address:\n")}`;
}
if(list){
  draw();
  list.addEventListener("click",e=>{const i=e.target.dataset.i;if(i!==undefined){cart[i]=(cart[i]||0)+1;updateCart()}});
  document.querySelectorAll(".chip").forEach(c=>c.addEventListener("click",()=>{
    document.querySelectorAll(".chip").forEach(x=>x.classList.remove("on"));
    c.classList.add("on");draw(c.dataset.f)}));
  document.getElementById("clearBtn").addEventListener("click",()=>{cart={};updateCart()});
}

// Contact form
const f=document.getElementById("cform");
if(f)f.addEventListener("submit",e=>{
  e.preventDefault();let ok=true;
  f.querySelectorAll("input,textarea").forEach(x=>{const bad=!x.checkValidity();x.classList.toggle("bad",bad);if(bad)ok=false});
  if(!ok)return;
  const body=`${f.m.value}\n\nFrom: ${f.n.value} (${f.e.value})`;
  location.href=`mailto:${EMAIL}?subject=${encodeURIComponent(f.s.value)}&body=${encodeURIComponent(body)}`;
  document.getElementById("sent").hidden=false;f.reset();
});