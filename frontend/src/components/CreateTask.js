import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { TextField, Button, Breadcrumbs, Link, Typography } from '@mui/material';
import { addTask } from '../redux/slices/taskSlice';

const CreateTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState('');

  const handleCreate = () => {
    dispatch(addTask({ name: taskName, isCompleted: false }));
    setTaskName('');
    navigate("/")
  };

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          tasks
        </Link>
        <Typography color="text.primary">new</Typography>
      </Breadcrumbs>
      <TextField
        label="Task Name"
        variant="outlined"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        style={{ marginTop: '20px' }}
      />
      <Button variant="contained" onClick={handleCreate} style={{ marginLeft: '20px', marginTop: '30px' }}>
        Create
      </Button>
    </>
  );
};

export default CreateTask;
