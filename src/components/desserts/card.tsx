import type { Product } from "../../types"
import cartIconUrl from '../../assets/images/icon-add-to-cart.svg'
import addIconUrl from '../../assets/images/icon-increment-quantity.svg'
import removeIconUrl from '../../assets/images/icon-remove-item.svg'

interface CardProps {
  product: Product
  initialQuantity: number
  onAddToCart: (product: Product) => void;
  onIncreaseQuantity: (productName: string) => void;
  onDecreaseQuantity: (productName: string) => void;
}

export const Card = ({ 
  product, 
  initialQuantity, 
  onAddToCart, 
  onIncreaseQuantity, 
  onDecreaseQuantity 
}: CardProps) => {

  return (
    <div className="flex flex-col">
      <div className="relative">
        <picture>
          <source media="(min-width: 1024px)" srcSet={product.image.desktop} />
          <source media="(min-width: 768px)" srcSet={product.image.tablet} />
          <source media="(max-width: 767px)" srcSet={product.image.mobile} />
          <img 
            src={product.image.thumbnail} 
            alt={product.name} 
            className={` rounded-xl w-full object-cover ${
              initialQuantity > 0 ? 'border-2 border-default' : 'border-2 border-transparent'
            }`}
          />
        </picture>

        {initialQuantity === 0 ? (
          <button 
            onClick={() => onAddToCart(product)}
            className="
              cursor-pointer
              absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 
              bg-white rounded-3xl px-4 py-3 border border-gray-300 
              flex items-center justify-center gap-2 
              text-base font-semibold w-44 text-gray-800
              hover:border-default hover:text-default
              focus:outline-none focus:ring-2 focus:ring-default
            "
          >
            <img src={cartIconUrl} alt="" className="w-5 h-5" />
            Add to Cart
          </button>
        ) : (
          <div 
            className="
              
              absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 
              bg-default rounded-3xl px-4 py-3 
              flex items-center justify-between gap-4 
              text-base font-semibold text-white w-44
            "
          >
            <button 
              onClick={() => onDecreaseQuantity(product.name)}
              className="cursor-pointer w-5 h-5 rounded-full border border-white flex items-center justify-center text-white hover:bg-white "
            >
              <img src={removeIconUrl} alt="Diminuir" className="w-3 h-3" />
            </button>
            <span className="text-lg">{initialQuantity}</span>
            <button 
              onClick={() => onIncreaseQuantity(product.name)}
              className="cursor-pointer w-5 h-5 rounded-full border border-white flex items-center justify-center text-white hover:bg-white"
            >
              <img src={addIconUrl} alt="Aumentar" className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      <div className="pt-8 mt-2"> 
        <label className="text-gray-500 text-sm">{product.category}</label>
        <label className="block text-lg font-bold text-gray-900">{product.name}</label>
        <label className="block text-lg font-bold text-red-600">${product.price.toFixed(2)}</label>
      </div> 
    </div>
  )
}