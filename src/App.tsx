import { useState } from "react"
import { Desserts } from "./components/desserts"
import { YourCart } from "./components/yourCart"
import { OrderConfirmationModal } from "./components/ConfirmetionScreen"
import type { Product, CartItem } from "./types"
import productData from "../data.json"

function App() {
  const [products] = useState<Product[]>(productData)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false)

  const handleAddToCart = (productToAdd: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.name === productToAdd.name);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.name === productToAdd.name ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      
      return [...prevItems, { ...productToAdd, quantity: 1 }];
    })
  }

  const handleIncreaseQuantity = (productName: string) => {
    setCartItems(prevItems =>
      prevItems.map(item => item.name === productName ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const handleDecreaseQuantity = (productName: string) => {
    setCartItems(prevItems =>
      prevItems
        .map(item =>
          item.name === productName ? { ...item, quantity: item.quantity - 1 } : item
        ).filter(item => item.quantity > 0) 
    )
  }

  const handleRemoveFromCart = (productName: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.name !== productName))
  }

  const handleConfirmOrder = () => {
    setIsOrderConfirmed(true)
  }

  const handleStartNewOrder = () => {
    setIsOrderConfirmed(false)
    setCartItems([])
  }

  return (
    <div className="relative flex flex-col lg:flex-row justify-center p-6 sm:p-12 bg-backgroud gap-8">
      <Desserts
        products={products}
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
      />
      
      <YourCart
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
        onConfirmOrder={handleConfirmOrder} 
      />

      {isOrderConfirmed && (
        <OrderConfirmationModal 
          cartItems={cartItems}
          onStartNewOrder={handleStartNewOrder}
        />
      )}
    </div>
  )
}

export default App;