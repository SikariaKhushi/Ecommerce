// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Product from '../components/products/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCarousel from '../components/products/ProductCarousel';
import Sidebar from '../components/Layout/Sidebar';
import { listProducts } from '../redux/actions/productActions';

const Home = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  // Filter products based on category and price range
  useEffect(() => {
    if (products) {
      let filtered = [...products];
      
      // Filter by category
      if (category !== 'all') {
        filtered = filtered.filter(product => product.category === category);
      }
      
      // Filter by price range
      if (priceRange !== 'all') {
        switch (priceRange) {
          case 'under50':
            filtered = filtered.filter(product => product.price < 50);
            break;
          case '50to100':
            filtered = filtered.filter(product => product.price >= 50 && product.price <= 100);
            break;
          case '100to200':
            filtered = filtered.filter(product => product.price > 100 && product.price <= 200);
            break;
          case 'over200':
            filtered = filtered.filter(product => product.price > 200);
            break;
          default:
            break;
        }
      }
      
      setFilteredProducts(filtered);
    }
  }, [products, category, priceRange]);

  // Extract unique categories from products
  const categories = products 
    ? [...new Set(products.map(product => product.category))] 
    : [];

  // Define price ranges
  const priceRanges = [
    { id: 'under50', name: 'Under $50' },
    { id: '50to100', name: '$50 to $100' },
    { id: '100to200', name: '$100 to $200' },
    { id: 'over200', name: 'Over $200' },
  ];

  return (
    <Container fluid>
      {!keyword && <ProductCarousel />}
      <Row>
        <Col md={3}>
          <Sidebar 
            categories={categories} 
            priceRanges={priceRanges}
            onCategoryChange={(cat) => setCategory(cat)}
            onPriceRangeChange={(range) => setPriceRange(range)}
          />
        </Col>
        <Col md={9}>
          <h1>Latest Products</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : filteredProducts.length === 0 ? (
            <Message variant="info">No products found</Message>
          ) : (
            <Row>
              {filteredProducts.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;