import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, editTask } from '../Redux/taskSlice';
import { ListItem, ListItemText, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button, Checkbox, FormControlLabel, Box, ListItemSecondaryAction } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode for the task
  const [editedTask, setEditedTask] = useState(task.text); // State to hold edited task text
  const [completed, setCompleted] = useState(task.completed); // State to track task completion status

  // Function to handle task deletion
  const handleDelete = () => {
    dispatch(deleteTask(task.id)); // Dispatch delete task action with task ID
    toast.error('Task deleted!'); // Display toast message for task deletion
  };

  // Function to enable task editing
  const handleEdit = () => {
    setIsEditing(true); // Set edit mode to true to open edit dialog/modal
  };

  // Function to save edited task
  const handleSave = () => {
    dispatch(editTask({ ...task, text: editedTask })); // Dispatch edit task action with updated task text
    setIsEditing(false); // Close edit dialog/modal
    toast.success('Task edited!'); // Display toast message for task edit success
  };

  // Function to toggle task completion
  const handleToggleComplete = () => {
    dispatch(editTask({ ...task, completed: !completed })); // Dispatch edit task action with toggled completion status
    setCompleted(!completed); // Update local state with toggled completion status
    toast.info(!completed ? 'Task completed!' : 'Task marked incomplete.'); // Display toast message based on current completion status
  };

  return (
    // Container for each task item with shadow and padding
    <Box boxShadow={3} borderRadius={4} p={2} mb={2}>
      {/* List item containing task text and completion checkbox */}
      <ListItem>
        {/* Checkbox for task completion */}
        <FormControlLabel
          control={<Checkbox checked={completed} onChange={handleToggleComplete} />}
          label={<ListItemText primary={task.text} />}
          style={{ textDecoration: completed ? 'line-through' : 'none' }} // Strike through text if task is completed
        />
        {/* Actions (edit and delete icons) aligned to the end */}
        <ListItemSecondaryAction>
          {/* Edit icon button */}
          <IconButton aria-label="edit" onClick={handleEdit} style={{ color: '#2196f3' }}>
            <EditIcon />
          </IconButton>
          {/* Delete icon button */}
          <IconButton aria-label="delete" onClick={handleDelete} style={{ color: '#f44336' }}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
        {/* Edit task dialog/modal */}
        <Dialog open={isEditing} onClose={() => setIsEditing(false)} fullWidth maxWidth="sm">
          {/* Dialog title */}
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            {/* Text field for editing task text */}
            <TextField
            autoFocus
            margin="dense"
            label="Task"
            type="text"
            fullWidth
            multiline  // Enable multiline text input
            rows={4}  // Set initial number of rows
            value={editedTask}
            onChange={e => setEditedTask(e.target.value)} // Update edited task text
          />
          </DialogContent>
          {/* Dialog actions (cancel and save buttons) */}
          <DialogActions>
            {/* Cancel button */}
            <Button onClick={() => setIsEditing(false)} color="primary">
              Cancel
            </Button>
            {/* Save button */}
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </ListItem>
    </Box>
  );
};

export default TaskItem;
