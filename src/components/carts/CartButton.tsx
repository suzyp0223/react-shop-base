import { useRecoilState } from 'recoil';
import { cartState } from './cartState';

import { CartIcon } from '../layout/Nav';


const CartButton = () => {
  const [cartCount, setCartCount] = useRecoilState(cartState);

  return (
    <div className='NavCart'>
      <button onClick={() => setCartCount(cartCount + 1)}>

      <CartIcon size={24} />
      {cartCount >= 0 && (
        <span className='CartBadge'>
          {cartCount}
        </span>
      )}

      </button>
    </div>
  );
};

export default CartButton;