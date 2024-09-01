import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import loginimg from '../assets/loginimg.jpg'; // Ensure this path is correct

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://todolist-14km.onrender.com/api/user/signup', { name, email, password });
      alert('User registered successfully');
      navigate('/login'); 
    } catch (error) {
      alert('Error registering user');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Section for Image */}
      <div className="relative lg:w-1/2 h-64 lg:h-auto border-r-2">
        <img
          src={loginimg}
          alt="Signup"
          className="absolute inset-0 object-cover w-full h-full lg:rounded-r-lg"
        />
      </div>

      {/* Right Section for Signup Form */}
      <div className="flex items-center justify-center w-full lg:w-1/2 bg-gray-100  p-4 lg:p-8 border-l-4">
        <div className="shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.5)_0px_3px_7px_-3px]
         w-full lg:w-[80%] mx-auto  p-8 space-y-3 bg-white rounded-xl  h-[80%]">
          <h1 className="text-2xl font-bold text-center">Sign Up</h1>
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-black px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-black px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 border text-black rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                required
              />
            </div>
            <button type="submit" className="w-[90%] mx-auto flex items-center justify-center px-4 py-2 font-bold text-white bg-indigo-500 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200">
              Sign Up
            </button>
          </form>
          <p className="text-sm text-center text-gray-600">
            Already have an account? <Link to="/login" className="text-indigo-500">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
