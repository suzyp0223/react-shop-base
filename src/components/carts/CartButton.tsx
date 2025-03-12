import { useRecoilState } from 'recoil';
import { cartState } from './cartState';

import { CartIcon } from '../layout/Nav';
import { Link } from 'react-router-dom';


const CartButton = () => {
  const [cartCount, setCartCount] = useRecoilState(cartState);

  return (
    <div className='NavCart'>
      <Link className='NavCartLink' to="/cart" >
        <button className="NavCartBtn" onClick={() => setCartCount(cartCount + 1)}>

          <CartIcon size={24} />
          {cartCount >= 0 && (
            <span className='CartBadge'>
              {cartCount}
            </span>
          )}

        </button>
      </Link>
    </div>
  );
};

export default CartButton;