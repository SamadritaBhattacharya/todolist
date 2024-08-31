import React from 'react'
import { useState } from 'react';

import { Grid2X2, Heart, House, MessageSquareMore, Power, Settings } from 'lucide-react';


const fetchUser = async () => {
    console.log(userId);
    
    try {
      const response = await axios.get(`http://localhost:8000/api/user/${userId}`, {
        withCredentials: true,
      });
      const data = response.data;
      setUser(data);
      
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

const Navbar = () => {
    const [user, setUser] = useState(null);
   const [activeButton, setActiveButton] = useState('home');
   const userId = params.id;
 

  useEffect(() => {
    
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/tasks", {
          withCredentials: true,
        });
        setTasks(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      }
    };

    const fetchUser = async () => {
      console.log(userId);
      
      try {
        const response = await axios.get(`http://localhost:8000/api/user/${userId}`, {
          withCredentials: true,
        });
        const data = response.data;
        setUser(data);
        
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchTasks();
    fetchUser();
  }, [navigate, userId]);
   
    // <div className="w-full md:w-64 bg-gray-800 text-white p-4 md:p-6">
    //     <div className="flex items-center space-x-4 mb-4 md:mb-6">
    //       <div>
    //         {user ? (
    //           <>
    //             <h2 className="text-lg md:text-xl text-white font-bold">{user.name}</h2>
    //             <p className="text-xs text-white md:text-sm">{user.email}</p>
                
    //           </>
    //         ) : (
    //           <p>Loading...</p>
    //         )}
    //       </div>
    //     </div>
    //     <button
    //       onClick={() => {
    //         localStorage.removeItem("token");
    //         navigate("/login");
    //       }}
    //       className="mt-4 md:mt-8 w-full py-2 px-4 bg-red-600 rounded hover:bg-red-700"
    //     >
    //       Sign Out
    //     </button>
      
    // </div>
    


 

  return (
    <div className='hidden lg:block'>
      <div className=' bg-white border-r-4 lg:h-screen lg:w-48 w-full sm:h-10 md:w-full h-14 md:h-14 items-center'>
        {/* <div className='font-extrabold text text-3xl hidden lg:block text-center'>
          <a href={"/"}>
            <div className='py-4'>
              <span className='text-orange-700 mt-2'>Snap</span><span>Scribe</span>
            </div>
          </a>
        </div> */}

        {/* <div className='flex lg:flex-col md:flex-col sm:flex sm:flex-row lg:items-start items-center gap-28'>
          <ul className='flex flex-row lg:flex-col items-center my-4 lg:items-start lg:h-[90%] h-10 w-[80%] mx-auto gap-6 justify-between font-medium text-md text-zinc-900'>
            {[
              { id: 'home', label: 'Home', icon: <House />, href: '/' },
              { id: 'folders', label: 'Folders', icon: <Grid2X2 />, href: '/folders' },
              { id: 'favourites', label: 'Favourites', icon: <Heart />, href: '/favourites' },
              { id: 'notifications', label: 'Notifications', icon: <MessageSquareMore />, href: '/notifications' },
            ].map((item) => (
              <li className='w-full' key={item.id}>
                <a href={item.href}>
                  <button
                    onClick={() => setActiveButton(item.id)}
                    className={`flex items-center w-full p-2 rounded-lg ${
                      activeButton === item.id
                        ? 'bg-orange-700 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className='lg:flex mr-2'>{item.icon}</span>
                    <span className='hidden lg:inline-block'>{item.label}</span>
                  </button>
                </a>
              </li>
            ))}
          </ul>

          <div className='w-full'>
            <hr className='text-black h-[2px] w-full' />

            <ul className='text-zinc-900 font-normal w-[80%] mx-auto mt-4 text-md justify-between gap-6 flex flex-col'>
              {[
                { id: 'settings', label: 'Settings', icon: <Settings />, href: '/settings' },
                { id: 'logout', label: 'Logout', icon: <Power />, href: '/logout' },
              ].map((item) => (
                <li className='w-full' key={item.id}>
                  <a href={item.href}>
                    <button
                      className='flex hover:bg-gray-100 w-full p-2 rounded-lg'
                    >
                      <span className='mr-4'>{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div> */}

        {/* <div className=' font-extrabold text text-3xl hidden lg:block text-center'>
             {user ? (
              <>
                <h2 className="text-lg md:text-xl text-white font-bold">{user.name}</h2>
                <p className="text-xs text-white md:text-sm">{user.email}</p>
                
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div> */}
          <div className='font-extrabold text text-3xl hidden lg:block text-center'>
          <div className='py-4'>
          Hello
          </div>
            </div>
        
      </div>
    </div>
  
  )
}

export default Navbar