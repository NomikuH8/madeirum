export {
  getOrders,
  addOrder,
  changeOrder,
  sendOrder
}

async function getOrders(setOrders: any) {
  let data = await fetch(`/api/get_orders`)
                    .then((res) => res.json())
  
  setOrders(data)
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

async function sendOrder() {
  await fetch(`/api/confirm_order`, {
    method: 'POST',
    body: localStorage.getItem('cart')!,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  localStorage.removeItem('cart')
}