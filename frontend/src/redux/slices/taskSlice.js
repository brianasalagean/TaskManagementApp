import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  tasks: [],
  status: 'idle',
  error: null,
};

export const getTasks = createAsyncThunk('tasks/getTasks', async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/tasks');
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addTask = createAsyncThunk('tasks/addTask', async (taskData) => {
  try {
    const response = await axios.post('http://localhost:3000/api/tasks', taskData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ taskId, taskData }) => {
  try {
    const response = await axios.put(`http://localhost:3000/api/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
  try {
    await axios.delete(`http://localhost:3000/api/tasks/${taskId}`);
    return taskId;
  } catch (error) {
    throw error;
  }
});

export const selectTasks = (state) => state.tasks.tasks;

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedTask = {
          id: action.meta.arg.taskId,
          name: action.meta.arg.taskData.name,
          isCompleted: action.meta.arg.taskData.isCompleted
        };
        state.tasks = state.tasks.map((task) => (task.id === updatedTask.id ? { ...task, ...updatedTask } : task));
      })
      
      .addCase(updateTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default taskSlice.reducer;
