import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of Next.js useRouter

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/user/login',
        { email, password },
        { withCredentials: true }
      );
      const userId = response.data._id;
      console.log(userId);
      navigate(`/dashboard/${userId}`); // Redirect using useNavigate
    } catch (error) {
      alert('Error logging in');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
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
              className="w-full text-black px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200">
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account? <Link to="/sign-up" className="text-indigo-500">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
