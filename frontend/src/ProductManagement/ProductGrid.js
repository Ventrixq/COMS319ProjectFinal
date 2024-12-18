import React from 'react';
import '../styles/products/ProductGrid.css'; // Import a CSS file for styling

const ProductGrid = ({ products }) => {
  return (
    <div className="product-grid-container">
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.productId}>
            <img
              src={product.imageURL}
              alt={product.name}
              className="product-image"
            />
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="product-price">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
