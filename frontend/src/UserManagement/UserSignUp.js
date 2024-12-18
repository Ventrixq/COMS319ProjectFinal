import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);  // Set the image file state
    setPreview(URL.createObjectURL(file)); // Show Preview
  }
      
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name || !password || !image) {
      setErrorMessage('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('imageURL', image);  // Append the image URL received from the upload
    formData.append('name', name);
    formData.append('password', password);
    formData.append('cart', []);

    try {
      const response = await fetch('http://localhost:8081/users/signup', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Successfully signed up
        navigate('/');  // Redirect to the login page
      } else {
        setErrorMessage('Error during sign-up');
        console.log(formData.entries.name)
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      setErrorMessage('Internal server error');
    }

    setName("")
    setPassword("")
    setImage(null)
    setPreview(null)
  };

  return (
    <div className="sign-up-form">
      <h2>Sign Up</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSignUp}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Upload Image</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/login">Log in here</a></p>
    </div>
  );
};

export default SignUp;