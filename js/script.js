let goods = {
  '12101': {
    name: 'Polo Cotton T-shirt',
    img: './img/1.jpg',
    price: 25,
  },
  '12102': {
    name: 'Polo T-shirt in structured cotton',
    img: './img/2.jpg',
    price: 50,
  },
  '12103': {
    name: 'Cotton T-shirt',
    img: './img/3.jpg',
    price: 15,
  },
  '12104': {
    name: 'White Cotton T-shirt',
    img: './img/4.jpg',
    price: 15,
  },
  '12105': {
    name: 'Organic Cotton T-shirt',
    img: './img/5.jpg',
    price: 35,
  },
  '12106': {
    name: 'Classic Cotton T-shirt',
    img: './img/6.jpg',
    price: 25,
  },
  '12107': {
    name: 'Cotton T-shirt Basic',
    img: './img/7.jpg',
    price: 15,
  },
  '12108': {
    name: 'T-shirt with patch',
    img: './img/8.jpg',
    price: 75,
  },
}

let cart = {}

// *selectors
const goodsInner = document.querySelector('.goods__inner');

// *on load
(function () {
  generateItems();
  checkCart();
  showMiniCart();
})()

// *generate items

function generateItems() {
  for (let key in goods) {
    goodsInner.innerHTML += `
      <div class="goods__item">
        <img class="goods__item-img" src="${goods[key].img}" alt="image">
        <h3 class="goods__item-title">${goods[key].name}</h3>
        <p class="goods__item-price">$${goods[key].price}</p>
        <div class="goods__item-wrapper">
          <button class="goods__item-buy">Buy</button>
          <button class="goods__item-add" data-art="${key}">
            <i class="fas fa-shopping-cart"></i>
          </button>
        </div>
      </div>
    `
  }
  const goodsItemAdd = document.querySelectorAll('.goods__item-add');
  goodsItemAdd.forEach(item => {
    item.addEventListener('click', () => {
      addToCart(item)
    })
  })
}

// *add to cart
function addToCart(item) {
  let cartArt = item.getAttribute('data-art');
  if (cart[cartArt] == undefined) {
    cart[cartArt] = 1;
  } else {
    cart[cartArt]++;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  showMiniCart();
}

// *check local storage
function checkCart() {
  if (localStorage.getItem('cart') != null) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }
}

// *show mini cart
function showMiniCart() {
  headerCartCounter();
  if (Object.keys(cart).length === 0 && cart.constructor === Object) {
    let out = '<h2>Empty  ( ͡° ͜ʖ ͡°)</h2>';
    document.querySelector('.cart__items').innerHTML = out;
    let total = 0;
    let cartTotalSum = document.querySelector('.cart__total-sum');
    cartTotalSum.innerHTML = total;
  } else {
    let out = '';
    let total = 0;
    let cartTotalSum = document.querySelector('.cart__total-sum');
    for (let key in cart) {
      total += goods[key].price * cart[key];
      out += `
      <div class="cart__item">
        <div class="cart__top">
          <img src="${goods[key].img}" alt="image" class="cart__img">
          <h4 class="cart__name">${goods[key].name}</h4>
          <button class="cart__remove" data-art="${key}">Remove</button>
        </div>
        <div class="cart__bottom">
          <div class="cart__amount">Amount:
            <span class="cart__count">${cart[key]} item</span>
            |
            <span class="cart__price">$${goods[key].price * cart[key]}</span>
          </div>
          <button class="cart__plus" data-art="${key}">
            <i class="fas fa-plus"></i>
          </button>
          <button class="cart__minus" data-art="${key}">
            <i class="fas fa-minus"></i>
          </button>
        </div>
      </div>
      `;
    }
    document.querySelector('.cart__items').innerHTML = out;
    cartTotalSum.innerHTML = `${total} $`;
    document.querySelectorAll('.cart__plus').forEach(item => {
      item.addEventListener('click', () => {
        plusGoods(item);
      })
    })
    document.querySelectorAll('.cart__minus').forEach(item => {
      item.addEventListener('click', () => {
        minusGoods(item);
      })
    })
    document.querySelectorAll('.cart__remove').forEach(item => {
      item.addEventListener('click', () => {
        removeGoods(item);
      })
    })
  }
}

function plusGoods(item) {
  let articul = item.getAttribute('data-art');
  cart[articul]++;
  localStorage.setItem('cart', JSON.stringify(cart));
  showMiniCart();
}
function minusGoods(item) {
  let articul = item.getAttribute('data-art');
  if (cart[articul] > 1) {
    cart[articul]--;
  } else {
    delete cart[articul];
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  showMiniCart();
}
function removeGoods(item) {
  let articul = item.getAttribute('data-art');
  delete cart[articul];
  localStorage.setItem('cart', JSON.stringify(cart));
  showMiniCart();
}

const miniCart = document.querySelector('.cart');
// *open cart
const openCart = document.querySelector('.header__cart');
openCart.addEventListener('click', () => {
  miniCart.classList.add('cart--open');
})
// *close cart
const closeCart = document.querySelector('.cart__close');
closeCart.addEventListener('click', () => {
  miniCart.classList.remove('cart--open');
})

// *header cart counter
function headerCartCounter() {
  const headerCart = document.querySelector('.header__cart-counter');
  let counter = 0;
  for (let key in cart) {
    counter += cart[key];
  }
  headerCart.innerHTML = counter;
}

let cartPurchase = document.querySelector('.cart__purchase');
cartPurchase.addEventListener('click', () => {
  if (Object.keys(cart).length === 0 && cart.constructor === Object) {
    alert('Your cart is empty');
  } else {
    alert('Your order has been sent');
    cart = {};
    localStorage.setItem('cart', JSON.stringify(cart));
    showMiniCart();
  }

})

// *form 
let form = document.querySelector('.form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Your order has been sent');
  form.classList.remove('form--open');
})

// *open from
let goodsItemBuy = document.querySelectorAll('.goods__item-buy');
goodsItemBuy.forEach(item => {
  item.addEventListener('click', () => {
    form.classList.add('form--open');
  })
})
// *close form
let formClose = document.querySelector('.form__close');
formClose.addEventListener('click', () => {
  form.classList.remove('form--open');
})