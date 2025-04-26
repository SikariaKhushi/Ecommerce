// src/components/products/Product.js
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';
import Rating from '../Rating';

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    if (product.countInStock > 0) {
      dispatch(addToCart(product._id, 1));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover object-center"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-lg font-semibold mb-2 text-gray-800 hover:text-blue-500 transition">
            {product.name}
          </h2>
        </Link>
        <div className="mb-2">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-gray-800">${product.price.toFixed(2)}</p>
          <button
            className={`px-3 py-1 rounded ${
              product.countInStock > 0
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={addToCartHandler}
            disabled={product.countInStock === 0}
          >
            {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Product;