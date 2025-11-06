import type { CartItem } from '../../types'
import emptyCartIcon from '../../assets/images/illustration-empty-cart.svg'
import carbonNeutralIcon from '../../assets/images/icon-carbon-neutral.svg'
import removeIcon from '../../assets/images/icon-remove-item.svg'

interface YourCartProps {
  cartItems: CartItem[]
  onRemoveFromCart: (productName: string) => void;
  onConfirmOrder: () => void;
}

export function YourCart({
  cartItems, onRemoveFromCart, onConfirmOrder 
}: YourCartProps) {

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const orderTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <aside className="bg-white rounded-lg p-6 w-full lg:w-1/3 lg:max-w-sm h-fit">
      <h2 className="text-2xl font-bold text-default mb-6">
        Your Cart ({totalItems})
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <img src={emptyCartIcon} alt="Empty cart" className="mx-auto mb-6 w-32" />
          <p className="font-semibold text-gray-500">Your added items will appear here</p>
        </div>
      ) : (
        <>
          <ul className="space-y-4   ">
            {cartItems.map(item => (
              <li key={item.name} className="flex items-center border-b border-gray-100 p-4 justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-default text-sm">{item.quantity}x</span>
                    <span className="text-gray-500 text-sm">@ ${item.price.toFixed(2)}</span>
                    <span className="font-semibold text-gray-600 text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveFromCart(item.name)}
                  className="cursor-pointer w-5 h-5 rounded-full border border-gray-400 text-gray-400 
                  hover:border-gray-800 hover:text-gray-800 flex items-center justify-center shrink-0"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <img src={removeIcon} alt="Remove" className="w-3 h-3" />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center my-4">
            <span className="text-gray-600">Order Total</span>
            <span className="text-3xl font-bold text-gray-900">${orderTotal.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-center gap-2 bg-rose-50 p-3 rounded-lg text-sm">
            <img src={carbonNeutralIcon} alt="Carbon neutral" className="w-5 h-5" />
            <span>This is a <span className="font-bold">carbon-neutral</span> delivery</span>
          </div>

          <button
            onClick={onConfirmOrder}
            className="cursor-pointer w-full bg-default text-white font-semibold py-3 rounded-full mt-4 hover:bg-red-700 transition-colors"
          >
            Confirm Order
          </button>
        </>
      )}
    </aside>
  )
}