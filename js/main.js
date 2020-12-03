const producten = [
  'Bier1_kleur',
  'Bier2_kleur',
  'Fietsje_kleur',
  'Karton_kleur',
  'Kussen_kleur',
  'Lade_kleur',
  'afzuigkap-kleur',
  'bezem-kleur',
  'bureaustoel-kleur',
  'droogrek-zwart',
  'hout-kleur',
  'koffie-kleur',
  'lamp-kleur',
  'magnetron-kleur',
  'matras-kleur',
  'pan-kleur',
  'pantoffels-kleur',
  'plastic-tassen-kleur',
  'prullenbak-kleur',
  'stofzuiger-kleur'
  ];
const productView = document.querySelector('#producten ul');


class Product {
  constructor(naam) {
    this.naam = naam;
    this.image = `<img src="../producten/${this.naam}.png" draggable='true' ondragstart="drag(event)" id="${naam}">`;
    this.x = 0;
    this.y = 0;
    this.order = 0;
  }
  remove (){
    const el = document.querySelector(`#${this.naam}`);
    el.style.position = "static";
    el.style.left = "auto";
    el.style.top = "auto";
    el.style.width = "auto";
    el.setAttribute("draggable", "true");
    el.setAttribute("ondragstart", "drag(event)");
    el.removeEventListener('mousedown', startMoveProduct);
    productView.appendChild(el);
  }
}

class Products{
  constructor(products){
    this.products = products
  }
  remove (id){
    this.products.forEach((product)=>{
      if(product.naam == id) {
        product.remove();
      }
    })
  }  
}
const products = new Products(producten.map(product => new Product(product)));

products.products.forEach((product) => {
  productView.innerHTML += product.image;
});
 
const options = document.querySelector('.options');
options.querySelector('input').addEventListener('input', changeSize);
options.querySelector('button').addEventListener('click', removeProduct);

function changeSize(event) {
  const product = document.querySelector(`#${event.target.parentElement.dataset.editing}`);
  product.style.width = event.target.value + 'px';
}

function removeProduct(event) {
  products.remove(event.target.parentElement.dataset.editing)
  event.target.parentElement.classList.remove('show');
  moving = null;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  if (data) {
    const product = document.getElementById(data);
    ev.target.appendChild(product);

    product.removeAttribute('draggable');
    product.removeAttribute('ondragstart');
    product.setAttribute('ondragstart', "return false");

    product.style.position = "absolute";
    product.style.left = (ev.pageX - 60) + 'px';
    product.style.top = (ev.pageY - 60) + 'px';

    const options = document.querySelector('.options');
    options.style.left = (ev.pageX - 90) + 'px';
    options.style.top = (ev.pageY - product.style.height * 4) + 'px';
    product.addEventListener('click', toggleOptions);

    product.addEventListener('mousedown', startMoveProduct);
  }
}


let moving = null;
window.addEventListener('mousemove', moveProduct);
window.addEventListener('mouseup', stopMovingProduct);

function startMoveProduct(event) {
  moving = event.target;
}

function moveProduct(event) {
  if(moving != null){
    const x = event.clientX - (moving.clientWidth / 2);
    const y = event.clientY - (moving.clientHeight / 2);
    moving.style.left = x + 'px';
    moving.style.top = y + 'px';  

    const options = document.querySelector('.options');
    options.style.left = (x - 90) + 'px';
    options.style.top = y + 'px';
  }
}

function stopMovingProduct() {
  moving = null;
}

function toggleOptions(event) {
  const options = document.querySelector('.options');
  options.classList.toggle('show');
  options.dataset.editing = event.target.id;
  options.style.left = (parseInt(event.target.style.left) - 90) + 'px';
  options.style.top = (parseInt(event.target.style.top)) + 'px';
}