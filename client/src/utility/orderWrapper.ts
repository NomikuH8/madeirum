export {
  addOrder
}

function addOrder(data: object) {
  let cart: Array<object> | null = JSON.parse(localStorage.getItem('cart')!)
  if (cart === null) {
    localStorage.setItem('cart', JSON.stringify([data]))
    return
  }

  cart.push(data)
  localStorage.setItem('cart', JSON.stringify(cart))
}