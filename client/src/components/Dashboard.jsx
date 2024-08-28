import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TaskList from "./TaskList";
import TaskFormModal from "./TaskForm";
import EditTaskFormModal from "./EditTaskForm";


export default function Dashboard() {
  const navigate = useNavigate(); // Use useNavigate instead of Next.js useRouter
  const [tasks, setTasks] = useState([]);
  const [showTaskFormModal, setShowTaskFormModal] = useState(false);
  const [showEditTaskFormModal, setShowEditTaskFormModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [user, setUser] = useState(null);
  const [taskLimitReached, setTaskLimitReached] = useState(false);
  
  
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
    // if (tasks.length >= 5 && !user.subscription) {
    //   setTaskLimitReached(true);
    //   setShowTaskFormModal(false);
    //   return;
    // }

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

  // const updateTask = async (id, updatedTask) => {
  //   try {
  //     const response = await axios.put(`http://localhost:8000/api/tasks/${id}`, updatedTask, {
  //       withCredentials: true,
  //     });
      
      
  //     setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
      
  //     setShowEditTaskFormModal(false);
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       navigate("/login");
  //     }
  //   }
  // };

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/tasks/${id}`, updatedTask, {
        withCredentials: true,
      });
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
      setShowEditTaskFormModal(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
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
    const updatedTask = tasks.find((task) => task._id === id);
    if (updatedTask) {
      await updateTask(id, { ...updatedTask, ...update });
      setShowEditTaskFormModal(false);
    }
  };

  



  return (
    <div className="flex flex-col md:flex-row h-screen">
      <aside className="w-full md:w-64 bg-gray-800 text-white p-4 md:p-6">
        <div className="flex items-center space-x-4 mb-4 md:mb-6">
          <div>
            {user ? (
              <>
                <h2 className="text-lg md:text-xl text-white font-bold">{user.name}</h2>
                <p className="text-xs text-white md:text-sm">{user.email}</p>
                
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="mt-4 md:mt-8 w-full py-2 px-4 bg-red-600 rounded hover:bg-red-700"
        >
          Sign Out
        </button>
      </aside>
      <main className="flex-1 p-4 md:p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-black">All Tasks</h1>
          <button
            onClick={() => setShowTaskFormModal(true)}
            className="py-2 px-4 bg-indigo-500 text-white rounded hover:bg-indigo-700"
          >
            + Add New Task
          </button>
        </div>

        {/* {taskLimitReached ? (
          <div className="text-center mt-8">
            <p className="text-red-600 font-bold">You have reached your task limit.</p>
            <button onClick={handleClick} className="text-blue-600 underline">
              Click here to subscribe and add more tasks
            </button>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={deleteTask}
            onComplete={completeTask}
            onUpdate={handleUpdateTask}
          />
        )} */}
        <TaskList
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={deleteTask}
            onComplete={completeTask}
            onUpdate={handleUpdateTask}
          />
      </main>
      {showTaskFormModal && (
        <TaskFormModal onClose={() => setShowTaskFormModal(false)} onSave={addTask} />
      )}
      {showEditTaskFormModal && selectedTask && (
        <EditTaskFormModal
          onClose={() => setShowEditTaskFormModal(false)}
          onSave={(id, updatedTask) => updateTask(id, updatedTask)}
          task={selectedTask}
        />
      )}
     
    </div>
  );
}
