// pages/PlaceOrder.js
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-bootstrap';
import { createOrder } from '../redux/actions/orderActions';
import { ORDER_CREATE_RESET } from '../redux/constants/orderConstants';
import { clearCart } from '../redux/actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import Loader from '../components/Loader';

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const cart = useSelector((state) => state.cart);
  
  // Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);
  
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error, loading } = orderCreate;
  
  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
      dispatch(clearCart());
    }
  }, [navigate, success, order, dispatch]);
  
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded shadow mb-6">
            <h2 className="text-xl font-bold mb-4">Shipping</h2>
            <p className="mb-2">
              <strong>Address:</strong> {cart.shippingAddress.address},{' '}
              {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{' '}
              {cart.shippingAddress.country}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded shadow mb-6">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <p className="mb-2">
              <strong>Method:</strong> {cart.paymentMethod}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <div>
                {cart.cartItems.map((item, index) => (
                  <div key={index} className="flex items-center py-4 border-b last:border-b-0">
                    <div className="w-16 mr-4">
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </div>
                    <div className="flex-grow">
                      <Link to={`/product/${item.product}`} className="text-blue-600 hover:underline">
                        {item.name}
                      </Link>
                    </div>
                    <div>
                      {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div>
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="border-b pb-2 mb-2 flex justify-between">
              <div>Items</div>
              <div>${cart.itemsPrice}</div>
            </div>
            <div className="border-b pb-2 mb-2 flex justify-between">
              <div>Shipping</div>
              <div>${cart.shippingPrice}</div>
            </div>
            <div className="border-b pb-2 mb-2 flex justify-between">
              <div>Tax</div>
              <div>${cart.taxPrice}</div>
            </div>
            <div className="border-b pb-4 mb-4 flex justify-between font-bold">
              <div>Total</div>
              <div>${cart.totalPrice}</div>
            </div>
            
            {error && <Message variant="danger">{error}</Message>}
            
            <button
              type="button"
              className="w-full bg-black text-white py-2 rounded disabled:bg-gray-400"
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              Place Order
            </button>
            
            {loading && <Loader />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;