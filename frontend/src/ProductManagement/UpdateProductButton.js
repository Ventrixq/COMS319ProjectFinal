import React, { useState } from 'react';

const UpdateProductButton = () => {
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [productData, setProductData] = useState({
    imageURL: '',   // Product Image URL
    productId: '',  // Product ID
    name: '',       // Product Name
    price: '',      // Product Price
    description: '', // Product Description
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // Handle the PUT request
  const handleUpdateProduct = async () => {
    if (!productData.productId || !productData.name || !productData.price || !productData.imageURL || !productData.description) {
      alert('Please fill out all fields!');
      return;
    }
  
    try {
      console.log(productData.productId)
      console.log(`http://localhost:8081/product/${productData.productId}`)
      const response = await fetch(`http://localhost:8081/product/${productData.productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            imageURL: productData.imageURL,
            name: productData.name,
            price: productData.price,
            description: productData.description,
        }),

      });
     
      if (response.ok) {
        const result = await response.json();
        console.log('Product updated:', result);
        alert('Product updated successfully!');
        setShowModal(false); // Close modal after successful update
      } else {
        console.error('Error updating product:', response.statusText);
        alert('Error updating product.');
      }
    } catch (error) {
      console.error('Request failed:', error);
      alert('Failed to update product.');
    }
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button onClick={() => setShowModal(true)}>Update Product</button>

      {/* Modal */}
      {showModal && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <h2>Update Product</h2>

            {/* Form Fields */}
            <label>
              Product ID:
              <input
                type="text"
                name="productId"
                value={productData.productId}
                onChange={handleInputChange}
                placeholder="Enter Product ID"
                required
              />
            </label>
            <br />
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                placeholder="Enter Product Name"
              />
            </label>
            <br />
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                placeholder="Enter Product Price"
              />
            </label>
            <br />
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                placeholder="Enter Product Description"
              />
            </label>
            <br />
            <label>
              Image URL:
              <input
                type="text"
                name="imageURL"
                value={productData.imageURL}
                onChange={handleInputChange}
                placeholder="Enter Product Image URL"
              />
            </label>
            <br />

            {/* Update and Cancel Buttons */}
            <button onClick={handleUpdateProduct}>Update Product</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles for modal (inline for simplicity)
const modalStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyles = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
  maxWidth: '500px',
  width: '100%',
};

export default UpdateProductButton;
