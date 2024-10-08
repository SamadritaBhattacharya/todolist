

// export default function App() {



  
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen grainy-dark ">

//       <div className=" h-[100%] w-[60%] mx-auto rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-0.5">
//        <div className="bg-slate-300 py-12 px-2 rounded-lg shadow-xl text-center ">
//         <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Task Manager</h1>
//         <p className="text-gray-600 mb-6">
//           Manage your tasks efficiently and effectively.
//         </p>
//         <div className="space-x-4">
//           <a href="/sign-up" className="inline-block px-6 py-2 text-white bg-indigo-500 rounded-full hover:bg-indigo-700">
            
//               Sign Up
           
//           </a>
//           <a href="/login" className="inline-block px-6 py-2 text-white bg-indigo-500 rounded-full hover:bg-indigo-700">
//               Login
//           </a>
//         </div>
//       </div> 
//       </div>
      
        
      
      
//     </div>
// )
// }

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import DashboardPage from "./routes/DashboardPage";
import Dashboard from "./components/Dashboard";
import Signup from "./routes/Signup";


export default function App(){
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/dashboard/:id" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}