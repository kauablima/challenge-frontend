import type { CartItem } from '../types'
import successIcon from '../assets/images/icon-order-confirmed.svg'

interface OrderConfirmationModalProps {
  cartItems: CartItem[]
  onStartNewOrder: () => void;
}

export const OrderConfirmationModal = ({ cartItems, onStartNewOrder }: OrderConfirmationModalProps) => {
  const orderTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 ">
      
      <div className="bg-white fixed bottom-0 p-6 rounded-t-lg pt-30
        lg:absolute lg:rounded-lg lg:bottom-auto
        md:absolute md:bottom-auto md:mt-screen md:mt-0 md:max-w-lg md:p-8
        md:rounded-lg max-h-lg w-full shadow-lg  
        ">
        <img src={successIcon} alt="Order confirmed" className="md:w-10 md:h-10 w-15 h-15 mb-5" />
        
        <h2 className="text-4xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Order Confirmed
        </h2>
        <p className="text-gray-500 md:text-sm text-lg mb-6">
          We hope you enjoy your food!
        </p>

        <div className=" md:max-h-60  max-h-60  overflow-y-auto bg-rose-50 rounded-lg">
          <ul className="space-y-4 p-4 sm:p-6">
            {cartItems.map((item, index) => (
              <li 
                key={item.name} 
                className={`flex items-center justify-between pb-4 ${index < cartItems.length - 1 ? 'border-b border-gray-200' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <img 
                    src={item.image.thumbnail} 
                    alt={item.name} 
                    className="w-12 h-12 rounded-md" 
                  />
                  <div>
                    <h3 className="font-semibold text-sm text-gray-800">{item.name}</h3>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-default text-sm">{item.quantity}x</span>
                      <span className="text-gray-500 text-sm">@ ${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <span className="font-semibold text-gray-800 text-sm">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        
        <div className="flex justify-between items-center mt-2 mb-6">
          <span className="text-gray-600">Order Total</span>
          <span className="text-2xl font-bold text-gray-900">
            ${orderTotal.toFixed(2)}
          </span>
        </div>

        <button 
          onClick={onStartNewOrder}
          className="cursor-pointer w-full bg-default text-white font-semibold py-3 rounded-full hover:bg-red-700 transition-colors"
        >
          Start New Order
        </button>
      </div>
    </div>
  )
}