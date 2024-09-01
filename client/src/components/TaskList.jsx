import React from 'react';
import Stopwatch from './Stopwatch';
import { SquarePen, Trash, Trash2 } from 'lucide-react';
import { useState } from 'react';

//import Switch from '@mui/material/Switch';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
import { FormControl, FormGroup, FormControlLabel, Switch } from '@mui/material';


const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 62,  // Increase the width for x-axis size
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',  // Adjusted for larger size
      '& + .MuiSwitch-track': {
        backgroundColor: 'green',  // Custom color when toggled on
        opacity: 1,
        border: 0,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 28,
    height: 28,
  },
  '& .MuiSwitch-track': {
    borderRadius: 20 / 2,
    backgroundColor: theme.palette.mode === 'dark' ? '#39393D' : '#E9E9EA',
    opacity: 1,
  },
}));


export default function TaskList({ tasks, onEdit, onDelete, onComplete, onUpdate }) {


  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = (event) => {
    setIsChecked(event.target.checked);
  };
 

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
              className={`py-1 px-6 rounded hover:bg-blue-900  ${task.completed ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-cyan-700'} text-white rounded-full`}
            >
              {task.completed ? 'Completed' : 'Complete'}
            </button>

            {/* <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="top"
                  control={<CustomSwitch checked={isChecked} onChange={handleToggle} />}
                  label={isChecked ? 'Completed' : 'Complete'}  // Dynamic label
                  labelPlacement="top"
                />
              </FormGroup>
            </FormControl> */}

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
