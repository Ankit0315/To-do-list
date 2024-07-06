import React from 'react';
import { Container, Typography } from '@mui/material';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';


const App = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        To-Do App
      </Typography>
      <TaskInput/>

      <TaskList/>
    </Container>
  );
};

export default App;
