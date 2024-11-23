const orders = JSON.parse(localStorage.getItem("orders")) || [];

// Functions
function addOrder(order) {
  orders.unshift(order) // same as push, but to the front of the array

  saveToStorage();
}

function findOrder(orderId) {
  let matchingOrder;
  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order
    } 
  })
  
  return matchingOrder;
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

export {orders, addOrder, findOrder}
