// Format price to currency
export const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };
  
  // Calculate cart total
  export const calculateCartTotal = (items) => {
    return items.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
  };
  
  // Calculate shipping cost based on cart total
  export const calculateShipping = (cartTotal) => {
    const total = parseFloat(cartTotal);
    return total > 100 ? 0 : 10;
  };
  
  // Format date
  export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  // Create a paginated array
  export const paginateArray = (array, pageSize, pageNumber) => {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  };
  
  // Sort products by different criteria
  export const sortProducts = (products, sortBy) => {
    const productsArray = [...products];
    
    switch (sortBy) {
      case 'price-low':
        return productsArray.sort((a, b) => a.price - b.price);
      case 'price-high':
        return productsArray.sort((a, b) => b.price - a.price);
      case 'newest':
        return productsArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'name-asc':
        return productsArray.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return productsArray.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return productsArray;
    }
  };
  
  // Filter products by category, price range, etc.
  export const filterProducts = (products, filters) => {
    return products.filter(product => {
      // Filter by category
      if (filters.category && product.category !== filters.category) {
        return false;
      }
      
      // Filter by price range
      if (filters.minPrice && product.price < filters.minPrice) {
        return false;
      }
      
      if (filters.maxPrice && product.price > filters.maxPrice) {
        return false;
      }
      
      // Filter by brand
      if (filters.brand && product.brand !== filters.brand) {
        return false;
      }
      
      // Filter by availability
      if (filters.inStock && product.countInStock === 0) {
        return false;
      }
      
      return true;
    });
  };