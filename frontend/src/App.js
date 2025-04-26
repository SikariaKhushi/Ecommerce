import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

// Layout Components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

// Pages
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';

// Admin Pages
import UserList from './pages/admin/UserList';
import UserEdit from './pages/admin/UserEdit';
import AdminProductList from './pages/admin/ProductList';
import ProductEdit from './pages/admin/ProductEdit';
import OrderList from './pages/admin/OrderList';

// Private Route Component
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow py-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search/:keyword" element={<ProductList />} />
              <Route path="/page/:pageNumber" element={<ProductList />} />
              <Route path="/search/:keyword/page/:pageNumber" element={<ProductList />} />
              <Route path="/category/:category" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart/:id?" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Private Routes */}
              <Route path="" element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/placeorder" element={<PlaceOrder />} />
                <Route path="/order/:id" element={<Order />} />
              </Route>
              
              {/* Admin Routes */}
              <Route path="" element={<AdminRoute />}>
                <Route path="/admin/userlist" element={<UserList />} />
                <Route path="/admin/user/:id/edit" element={<UserEdit />} />
                <Route path="/admin/productlist" element={<AdminProductList />} />
                <Route path="/admin/productlist/:pageNumber" element={<AdminProductList />} />
                <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
                <Route path="/admin/orderlist" element={<OrderList />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;