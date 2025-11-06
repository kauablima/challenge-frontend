import type { Product, CartItem } from "../../types"
import { Card } from "./card"

interface DessertsProps {
  products: Product[]
  cartItems: CartItem[]
  onAddToCart: (product: Product) => void;
  onIncreaseQuantity: (productName: string) => void;
  onDecreaseQuantity: (productName: string) => void;
}

export function Desserts({
  products, cartItems, onAddToCart, onIncreaseQuantity, onDecreaseQuantity
}: DessertsProps) {
  return (
    <main className="w-full lg:w-2/3">
      <h4 className="font-bold text-4xl mb-8">Desserts</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">

        {products.map((product) => {
          const itemInCart = cartItems.find(item => item.name === product.name);
          const initialQuantity = itemInCart ? itemInCart.quantity : 0;
          return (
            <Card
              key={product.name}
              product={product}
              initialQuantity={initialQuantity}

              onAddToCart={onAddToCart}
              onIncreaseQuantity={onIncreaseQuantity}
              onDecreaseQuantity={onDecreaseQuantity} />
          )
        })}
      </div>
    </main>
  );
}