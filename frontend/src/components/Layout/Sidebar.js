// src/components/layout/Sidebar.js
import React, { useState } from 'react';
import { Card, ListGroup, Form } from 'react-bootstrap';

const Sidebar = ({ categories, priceRanges, onCategoryChange, onPriceRangeChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  const handlePriceRangeChange = (range) => {
    setSelectedPriceRange(range);
    onPriceRangeChange(range);
  };

  return (
    <div className="sidebar">
      <Card className="mb-4">
        <Card.Header>Categories</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item 
            action 
            active={selectedCategory === 'all'}
            onClick={() => handleCategoryChange('all')}
          >
            All
          </ListGroup.Item>
          {categories && categories.map((category) => (
            <ListGroup.Item 
              key={category} 
              action 
              active={selectedCategory === category}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>

      <Card>
        <Card.Header>Price Range</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item 
            action 
            active={selectedPriceRange === 'all'}
            onClick={() => handlePriceRangeChange('all')}
          >
            All
          </ListGroup.Item>
          {priceRanges && priceRanges.map((range) => (
            <ListGroup.Item 
              key={range.id} 
              action 
              active={selectedPriceRange === range.id}
              onClick={() => handlePriceRangeChange(range.id)}
            >
              {range.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>
  );
};

export default Sidebar;