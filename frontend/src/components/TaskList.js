// TaskList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Checkbox,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  TextField,
} from '@mui/material';
import { getTasks, updateTask, deleteTask, selectTasks } from '../redux/slices/taskSlice';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState('');

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleUpdateIsCompleted = (taskId, isCompleted, name) => {
    dispatch(updateTask({ taskId, taskData: { name: name, isCompleted: !isCompleted } }));
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleEditStart = (taskId, taskName) => {
    setEditTaskId(taskId);
    setEditedTaskName(taskName);
  };

  const handleEditCancel = () => {
    setEditTaskId(null);
    setEditedTaskName('');
  };

  const handleUpdateName = (taskId, isCompleted) => {
    dispatch(updateTask({ taskId, taskData: { name: editedTaskName, isCompleted: isCompleted } }));
    setEditTaskId(null);
    setEditedTaskName('');
  };

  return (
    <>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <Checkbox
              checked={task.isCompleted}
              onChange={() => handleUpdateIsCompleted(task.id, task.isCompleted, task.name)}
            />
            {editTaskId === task.id ? (
              <>
                <TextField
                  value={editedTaskName}
                  onChange={(e) => setEditedTaskName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUpdateName(task.id, task.isCompleted);
                    } else if (e.key === 'Escape') {
                      handleEditCancel();
                    }
                  }}
                />
              </>
            ) : (
              <>
                <ListItemText
                  primary={task.name}
                  onClick={() => handleEditStart(task.id, task.name)}
                  style={{ cursor: 'pointer' }}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task.id)}>
                    Delete
                  </IconButton>
                </ListItemSecondaryAction>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default TaskList;
