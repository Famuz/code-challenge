import './styles.css';

console.log('hello from UMG!');


// Code Challenge code cart functionality
// Elements
const btnCart = document.querySelector('#btn-cart')
const addToCartForms = document.querySelectorAll('form[action="/cart/add"]')
const anchorsCart = document.querySelectorAll('a[href="/cart"]')

btnCart?.addEventListener('click', openCart)

addToCartForms.forEach(form => {
  form.addEventListener('submit', async (event) => {
    // Prevent submission behaviour
    event.preventDefault();

    // Submit form using AJAX
    await fetch("/cart/add", {
      method: "post",
      body: new FormData(form as HTMLFormElement)
    });

    // Update Cart
    await updateCart()

    // Open cart drawer
    openCart();

    // Get new cart object
    const res = await  fetch("/cart.json")
    const cart = await res.json()
    
    // Update cart count
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = cart.item_count
    })

    const notification = document.createElement('p')
    notification?.classList.add("block", "text-center", "text-sm", "mt-4")
    notification.textContent = "Added to cart"
    form.appendChild(notification)

    setTimeout(() => {
      notification.remove()
    }, 3000); 
  })
})

anchorsCart.forEach( a => {
  a.addEventListener('click', (e) => {
    e.preventDefault()
  })
})

function openCart() {
  const cartDrawer = document.querySelector('.cart-drawer')
  
    if(cartDrawer?.classList.contains('hidden')) { 
      document.querySelector('.cart-drawer')?.classList.remove('hidden') 
      document.querySelector('.cart-drawer')?.classList.add('flex') 
    } else {
      document.querySelector('.cart-drawer')?.classList.remove('flex') 
      document.querySelector('.cart-drawer')?.classList.add('hidden')
    }
}

async function updateCart() {
  const res = await fetch('/?shopify-section_id=cart')
  const text = await res.text();
  console.log(text);
  const div = document.createElement('div')
  div.innerHTML = text
  console.log(div)
  
  const newBox = div.querySelector('.cart-drawer')?.innerHTML
  console.log(newBox);
  
  if(document.querySelector('.cart-drawer')?.innerHTML) {
    console.log("remove it");
    
    document.querySelector('.cart-drawer-box')?.remove();
    document.querySelector('.cart-drawer')?.appendChild(newBox)
  }
  
}

