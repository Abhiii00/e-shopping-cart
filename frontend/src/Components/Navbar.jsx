import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'; 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const Navbar = () => {
  let dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.cartItems)

  let length = cartItems.length[0] !== '' ? cartItems.length : 0
  return (
    <>
      <div className="navbar">
        <h1>
            <Link to='/' className='nav-link'>Shopping Cart</Link>
        </h1>
        <h2>
            <Link to = '/cart' className='nav-link'><ShoppingCartIcon/><sup>{length}</sup></Link></h2>
      </div>
    </>
  );
};

export default Navbar;
