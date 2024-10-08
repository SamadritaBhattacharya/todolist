import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TaskList from "./TaskList";
import TaskFormModal from "./TaskForm";
import EditTaskFormModal from "./EditTaskForm";
import Navbar from "./Navbar";
import { BellRing, Calendar, LogOutIcon, Mail, Notebook, NotebookPen, Plus, Settings, User, UserIcon } from "lucide-react";
import { motion } from "framer-motion";


export default function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [showTaskFormModal, setShowTaskFormModal] = useState(false);
  const [showEditTaskFormModal, setShowEditTaskFormModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [user, setUser] = useState(null);
  const [taskLimitReached, setTaskLimitReached] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false); 
  
  
  const [completedTaskId, setCompletedTaskId] = useState(null);
  const params = useParams();
  
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

  const addTask = async (task) => {
    
    try {
      const response = await axios.post("http://localhost:8000/api/tasks", task, {
        withCredentials: true,
      });
      setTasks([...tasks, response.data]);
      setShowTaskFormModal(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

 

  const updateTask = async (id, updatedTask) => {
    try {
     
      const response = await axios.put(`http://localhost:8000/api/tasks/${id}`, updatedTask, {withCredentials: true});
      console.log("Received response:", response);
  
      
      if (response && response.status === 200) {
        console.log('State updated');
  
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === id ? response.data : task))
        );
      } else {
        
        console.error("Unexpected response status:", response.status, response.data);
      }
  
    } catch (error) {
      
      console.error("Error during task update:", error);
  
      if (error.response) {
       
        console.error("Server responded with an error:", error.response.status, error.response.data);
  
        if (error.response.status === 401) {
          navigate("/login");
        }
      } else if (error.request) {
       
        console.error("No response received from server:", error.request);
      } else {
       
        console.error("Error in setting up the request:", error.message);
      }
    }
  };
  


  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${id}`, {
        withCredentials: true,
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  const completeTask = async (id) => {
    try {
      const task = tasks.find((task) => task._id === id);
      const updatedTask = { ...task, completed: !task.completed };
      await updateTask(id, updatedTask);
      setCompletedTaskId(id);
     
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleEditTask = async (taskId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/tasks/${taskId}`, {
        withCredentials: true,
      });
      const task = response.data;
      setSelectedTask(task);
      setShowEditTaskFormModal(true);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  
  const handleUpdateTask = async (id, update) => {
    console.log('Entered');
  
    const updatedTask = tasks.find((task) => task._id === id);
  
    if (updatedTask) {
      console.log("State not updated, task updated");
  
      try {
       
        await updateTask(id, { ...updatedTask, ...update });
        console.log('Task update called successfully.');
        
        setShowEditTaskFormModal(false);
        
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  const [hovered, setHovered] = useState(false);


  return (
    <div className="">
     
    <div className="flex flex-col md:flex-row h-screen w-full ">

      {/* Navbar */}     
      {/* <aside
              className={` hidden lg:flex bg-cyan-950 opacity-80 text-white p-4  transition-all duration-300  items-center justify-center border-r-6 border-slate-100 transform ${
                hovered ? "w-62 transform translate-x-1 scale-x-110" : "w-20"
              }`}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <div className="flex flex-col items-center  space-y-16  h-[98%] w-full py-1  ">

                <div className="  h-[10%] ">
                  <div className="flex items-center space-x-4">
                  <NotebookPen className=" text-white" size={30} />
                  {hovered && <span className="ml-2 text-xl font-bold">TodoMaster</span>}
                </div>
                </div>

              



                <div className=" h-[70%] space-y-12">
                <div className="flex items-center space-x-4">
                  <UserIcon className="text-white" size={30} />
                  {hovered && (
                    <div>
                      {user ? (
                        <>
                          <h2 className="text-lg md:text-xl font-bold">
                            {user.name}
                          </h2>
                          <p className="text-xs md:text-sm">{user.email}</p>
                        </>
                      ) : (
                        <p>Loading...</p>
                      )}
                    </div>
                  )}


              

                </div>
                <div className="flex items-center space-x-4">
                <Mail className="text-white text-base" size={30} />
                  {hovered && (
                    <div>
                      {user ? (
                        <>
                          
                          <p className="text-xs md:text-sm">{user.email}</p>
                        </>
                      ) : (
                        <p>Loading...</p>
                      )}
                    </div>
                  )}
                  </div>

                  <button className=" flex items-center space-x-4">
                      <BellRing size={30}/>
                      {hovered && <span className="ml-2">Notification</span>}
                    </button>

                    <button className=" flex items-center space-x-4">
                      <Calendar size={30}/>
                      {hovered && <span className="ml-2">Calendar</span>}
                    </button>

                </div>


                

                

                <div className="h-[20%]  space-y-12 w-full flex flex-col">
                
                    <button className=" flex items-center space-x-4">
                      <Settings size={30}/>
                      {hovered && <span className="ml-2">Settings</span>}
                    </button>
                  

                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                  className="flex items-center space-x-4"
                >
                  <LogOutIcon  size={30} />
                  {hovered && <span className="ml-2">Sign Out</span>}
                </button>
                </div>
              </div>
              
        </aside> */}


      <aside
        className="hidden lg:flex bg-cyan-950 opacity-80 text-white p-4 transition-all duration-300 items-center justify-center border-r-8 border-slate-100"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.div
          className="flex flex-col items-center space-y-16 h-[98%] w-full py-1 "
          animate={{
            width: hovered ? "220px" : "50px",
            opacity: hovered ? 1 : 0.9,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <div className="h-[10%]">
            <div className="flex items-center space-x-4">
              <NotebookPen className="text-white" size={30} />
              {hovered && <motion.span className="ml-2 text-xl font-bold">TodoMaster</motion.span>}
            </div>
          </div>

          <div className="h-[70%] space-y-12">
            <div className="flex items-center space-x-4">
              <UserIcon className="text-white" size={30} />
              {hovered && (
                <motion.div>
                  {user ? (
                    <>
                      <h2 className="text-lg md:text-xl font-bold">{user.name}</h2>
                      <p className="text-xs md:text-sm">{user.email}</p>
                    </>
                  ) : (
                    <p>Loading...</p>
                  )}
                </motion.div>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="text-white text-base" size={30} />
              {hovered && (
                <motion.div>
                  {user ? (
                    <>
                      <p className="text-xs md:text-sm">{user.email}</p>
                    </>
                  ) : (
                    <p>Loading...</p>
                  )}
                </motion.div>
              )}
            </div>

            <motion.button className="flex items-center space-x-4">
              <BellRing size={30} />
              {hovered && <span className="ml-2">Notification</span>}
            </motion.button>

            <motion.button className="flex items-center space-x-4">
              <Calendar size={30} />
              {hovered && <span className="ml-2">Calendar</span>}
            </motion.button>
          </div>

         


          <div className="h-[26%] space-y-12 w-full flex flex-col items-center justify-center ">
            

            <motion.button className="flex items-center space-x-4">
              <Settings size={30} />
              {hovered && <span className="ml-2">Settings</span>}
            </motion.button>

            <motion.button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              className="flex items-center space-x-4"
            >
              <LogOutIcon size={30} />
              {hovered && <span className="ml-2">Sign Out</span>}
            </motion.button>
          </div>
        </motion.div>
      </aside>



      <main className="flex-1 p-4 md:p-8 grainy-dark ">
      {/* bg-gradient-to-br from-green-100 via-sky-100 to-slate-300 */}
      {/* bg-gradient-to-br from-gray-50 via-green-100 to-neutral-200 */}
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl  font-semibold bg-gradient-to-r from-teal-700 to-zinc-600 bg-clip-text text-transparent ">All Tasks</h1>
          <button
            onClick={() => setShowTaskFormModal(true)}
            className=" hidden py-2 px-4 bg-neutral-500 font-medium text-white rounded-xl hover:bg-slate-700 lg:flex gap-2"
          >
             Add New Task <Plus />
          </button>
          
          <div className="lg:hidden flex gap-2 relative">
               <button
                onClick={() => setShowTaskFormModal(true)}
                className="p-[2px] ring-neutral-500 ring-2 font-medium text-white rounded-full hover:bg-slate-300 flex gap-2"
              >
                <Plus className="text-slate-700" />
              </button>

              <button
                onClick={() => setDropdownVisible(!dropdownVisible)}
                className="p-[2px] ring-neutral-500 ring-2 font-medium text-white rounded-full hover:bg-slate-300 flex gap-2"
              >
                <User className=" text-slate-700" />
              </button>

              {/* Dropdown for mobile view */}
              {dropdownVisible && (
                <div className="absolute top-full right-0 bg-white text-gray-800 shadow-lg rounded-lg mt-2 p-4 z-50">
                  <p className="text-lg font-semibold">{user?.name}</p>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/login");
                    }}
                    className="w-full py-2 mt-4 bg-zinc-200 text-zinc-500 rounded-full hover:bg-neutral-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
        </div>

        
          


        
        <div className="  w-[98%] mx-auto">
        <TaskList
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={deleteTask}
            onComplete={completeTask}
            onUpdate={handleUpdateTask}
          
          />
          </div>
      </main>
      {showTaskFormModal && (
        <TaskFormModal onClose={() => setShowTaskFormModal(false)} onSave={addTask} />
      )}
      {showEditTaskFormModal && selectedTask && (
        <EditTaskFormModal

          onSave={handleUpdateTask}

          onClose={() => setShowEditTaskFormModal(false)}          
          task={selectedTask}
        />
      )}
     
    </div>

 



  </div>
  );
}
