const products = [
  { pId: 1, name: "iPad 4 Mini", price: 500.01, amount: 4, inStock: 4 },
  { pId: 3, name: "H&M T-Shirt White", price: 10.99, amount: 3, inStock: 3 },
  { pId: 5, name: "Charli XCX - Sucker CD", price: 19.99, amount: 2, inStock: 2 }
]

export default {
  getProducts() {
    return products;
  }
}