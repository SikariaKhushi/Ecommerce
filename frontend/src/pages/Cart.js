// pages/Cart.js
import React, { useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';

const Cart = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cartItems.length === 0 ? (
            <div className="bg-blue-100 p-4 rounded">
              Your cart is empty <Link to="/" className="text-blue-600 hover:underline">Go Back</Link>
            </div>
          ) : (
            <div className="bg-white rounded shadow">
              {cartItems.map((item) => (
                <div key={item.product} className="p-4 border-b last:border-b-0 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <div className="w-24">
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </div>
                  <div className="flex-grow text-center sm:text-left">
                    <Link to={`/product/${item.product}`} className="text-lg font-medium hover:text-blue-600">
                      {item.name}
                    </Link>
                    <p className="mt-1 text-gray-700">${item.price}</p>
                  </div>
                  <div className="w-24">
                    <select
                      className="form-select w-full border rounded p-2"
                      value={item.qty}
                      onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-4">
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
            </h2>
            <p className="mb-4 text-lg">
              ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </p>
            <button
              type="button"
              className="w-full bg-black text-white py-2 rounded disabled:bg-gray-400"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;