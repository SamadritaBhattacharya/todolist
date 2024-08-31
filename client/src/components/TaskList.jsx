import React from 'react';
import Stopwatch from './Stopwatch';
import { SquarePen, Trash, Trash2 } from 'lucide-react';

export default function TaskList({ tasks, onEdit, onDelete, onComplete, onUpdate }) {
 

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 py-2 max-w-full mx-auto ">
      {tasks.map((task) => (
        <div key={task._id} className="shadow-[10px_10px_20px_rgba(8,_112,_184,_0.4)] 
         w-full  h-full p-6 rounded-xl transform bg-slate-50 transition hover:scale-105 hover:bg-white  ">
          <div className=' flex flex-row-reverse justify-between space-y-4'>
            <div className=' flex gap-4 text-neutral-600 p-0  relative bottom-4'>
              
              <button onClick={() => onEdit(task._id)} className=''>
              <SquarePen />
            </button>
              
             <button className=' text-red-700 opacity-70' onClick={() => onDelete(task._id)}>
              <Trash2 />
            </button>
            </div>
            
          <h2 className="lg:text-4xl text-xl md:text-2xl py-2 font-bold text-slate-700">{task.title}</h2>
          
          </div>

          <p className="text-neutral-700 text-wrap text-base w-full h-[25%] ">{task.description}</p>
          
          
          <Stopwatch
            startTime={task.startTime}
            elapsedTime={task.elapsedTime}
            onUpdate={(update) => onUpdate(task._id, update)}
          />
          <div className="flex p-4 items-center justify-center   ">
            <button
              onClick={() => onComplete(task._id)}
              className={`py-1 px-6 rounded hover:bg-cyan-500  ${task.completed ? 'bg-green-500' : 'bg-blue-900'} text-white rounded-full`}
            >
              {task.completed ? 'Completed' : 'Complete'}
            </button>
            {/* <button onClick={() => onEdit(task._id)} className="ml-2 py-1 px-2 bg-blue-500 text-white rounded">
              Edit
            </button> */}
            {/* <button onClick={() => onDelete(task._id)} className="ml-2 py-1 px-2 bg-red-500 text-white rounded">
              Delete
            </button> */}
          </div>
        </div>
      ))}
    </div>
  );
}
