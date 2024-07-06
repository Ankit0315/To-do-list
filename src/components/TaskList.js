import React from 'react';
import { useSelector } from 'react-redux';
import { List, ListItem, Paper, Typography } from '@mui/material'; // Importing necessary components from Material-UI
import TaskItem from './TaskItem';

const TaskList = () => {
  const tasks = useSelector(state => state.tasks); // Fetching tasks from Redux store

  return (
    <Paper elevation={3} sx={{ p: 2, width: 520, margin: 'auto' }}> {/* Paper component for styling */}
      <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', mb: 2, }}>
        Task List
      </Typography>
      <List>
        {/* Mapping through tasks and rendering TaskItem component for each task */}
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </List>
    </Paper>
  );
};

export default TaskList;
