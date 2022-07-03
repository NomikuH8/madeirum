export {
  addOrder,
  changeOrder,
  sendOrder
}

function addOrder(data: any) {
  let cart: Array<any> | null = JSON.parse(localStorage.getItem('cart')!)
  if (cart === null) {
    localStorage.setItem('cart', JSON.stringify([data]))
    return
  }

  for (let i = 0; i < cart.length; i++) {
    if (data.nome_produto === cart[i].nome_produto) {
      if (data.observation === cart[i].observation) {
        cart[i].quantity++
        localStorage.setItem('cart', JSON.stringify(cart))
        return
      }
    }
  }
  cart.push(data)
  localStorage.setItem('cart', JSON.stringify(cart))
}

function changeOrder(data: object, idx: number) {
  let cart: Array<object> | null = JSON.parse(localStorage.getItem('cart')!)
  if (cart === null)
    return

  cart[idx] = data
  localStorage.setItem('cart', JSON.stringify(cart))
}

function sendOrder() {
  // TO IMPLEMENT
  fetch(`/api/confirm_order`, {
    method: 'POST',
    body: JSON.parse(localStorage.getItem('cart')!)
  })
}