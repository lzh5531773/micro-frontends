/* globals document */
const $app = document.getElementById('app');

// data
const product = {
  name: 'Tractor',
  variants: [
    {
      sku: 't_red',
      color: 'red',
      name: 'Porsche-Diesel Master 419',
      image: './images/tractor-red.jpg',
      thumb: './images/tractor-red-thumb.jpg',
      price: '66,00 €',
    },
    {
      sku: 't_green',
      color: 'green',
      name: 'Fendt F20 Dieselroß',
      image: './images/tractor-green.jpg',
      thumb: './images/tractor-green-thumb.jpg',
      price: '54,00 €',
    },
    {
      sku: 't_blue',
      color: 'blue',
      name: 'Eicher Diesel 215/16',
      image: './images/tractor-blue.jpg',
      thumb: './images/tractor-blue-thumb.jpg',
      price: '58,00 €',
    },
  ],
};

const recos = {
  t_red: ['3', '5', '6'],
  t_green: ['3', '6', '4'],
  t_blue: ['1', '8', '7'],
};

const state = {
  variant: 't_blue',
  cart: 0,
};

function renderOption(variant) {
  const active = state.variant === variant.sku ? 'active' : '';
  return `
    <button class="${active}" type="button" data-sku="${variant.sku}">
      <img src="${variant.thumb}" alt="${variant.name}" />
    </button>
  `;
}

function renderReco(id) {
  return `<img src="./images/reco_${id}.jpg" alt="Reco ${id}" />`;
}

function renderPage() {
  const variant = product.variants.find(v => state.variant === v.sku);
  const reco = recos[variant.sku];
  $app.innerHTML = `
    <h1 id="store">The Model Store</h1>
    <div id="basket">basket: ${state.cart} item(s)</div>
    <div id="image"><img src="${variant.image}" alt="${variant.name}" /></div>
    <h2 id="name">${product.name} <small>${variant.name}</small></h2>
    <div id="options">${product.variants.map(renderOption).join('')}</div>
    <button id="buy" type="button">buy for ${variant.price}</button>
    <div id="reco"><h3>Related Products</h3>${reco.map(renderReco).join('')}</div>
  `;
}

function rerender() {
  removeListeners();
  renderPage();
  addListeners();
}

function handleClickOption(e) {
  const sku = e.currentTarget.getAttribute('data-sku');
  state.variant = sku;
  rerender();
}

function addListeners() {
  const $btns = document.querySelectorAll('#options button');
  Array.prototype.forEach.call($btns, $btn =>
     $btn.addEventListener('click', handleClickOption)
  );
}

function removeListeners() {
  const $btns = document.querySelectorAll('#options button');
  Array.prototype.forEach.call($btns, $btn =>
     $btn.removeEventListener('click', handleClickOption)
  );
}

renderPage();
addListeners();
