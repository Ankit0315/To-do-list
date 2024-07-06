import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../Redux/taskSlice';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import { toast } from 'react-toastify';

const TaskInput = () => {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();

  // Function to handle adding a new task
  const handleAddTask = () => {
    // Check if task input is not empty
    if (task.trim()) {
      // Dispatch action to add task with current timestamp as ID
      dispatch(addTask({ id: Date.now(), text: task, completed: false }));
      // Clear task input after adding task
      setTask('');
      // Show success message using toast notification
      toast.success('Task added successfully!');
    }
  };

  return (
    // Container for task input form
    <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
      {/* Paper component for styling and elevation */}
      <Paper elevation={1} sx={{ p: 2, width: 800, borderRadius: 0, boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.6)', borderColor: 'black' }}>
        {/* Title for task input section */}
        <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center', mb: 2, color: '#F33' }}>
          Enter a new task here
        </Typography>
        {/* Text field for entering task */}
        <TextField
          label="Task"
          variant="standard"
          value={task}
          onChange={(e) => setTask(e.target.value)} // Update task state as user types
          fullWidth
          sx={{ mb: 2, backgroundColor: '#f0f0f0' }} // Styling for text field
        />
        {/* Button to add task */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTask} // Call handleAddTask function on button click
          fullWidth
          sx={{ borderRadius: 0 }} // Styling for button
        >
          Add Task
        </Button>
      </Paper>
    </Box>
  );
};

export default TaskInput;
