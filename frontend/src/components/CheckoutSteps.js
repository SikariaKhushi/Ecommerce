// src/components/CheckoutSteps.js
import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="flex justify-center mb-4">
      <div className="flex items-center">
        <div>
          {step1 ? (
            <Link to="/login" className="text-blue-500">
              Sign In
            </Link>
          ) : (
            <span className="text-gray-400">Sign In</span>
          )}
        </div>

        <div className="mx-3">&gt;</div>

        <div>
          {step2 ? (
            <Link to="/shipping" className="text-blue-500">
              Shipping
            </Link>
          ) : (
            <span className="text-gray-400">Shipping</span>
          )}
        </div>

        <div className="mx-3">&gt;</div>

        <div>
          {step3 ? (
            <Link to="/payment" className="text-blue-500">
              Payment
            </Link>
          ) : (
            <span className="text-gray-400">Payment</span>
          )}
        </div>

        <div className="mx-3">&gt;</div>

        <div>
          {step4 ? (
            <Link to="/placeorder" className="text-blue-500">
              Place Order
            </Link>
          ) : (
            <span className="text-gray-400">Place Order</span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default CheckoutSteps;