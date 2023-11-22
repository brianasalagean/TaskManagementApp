import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { AppBar, Tabs, Tab, Container } from '@mui/material';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';

const App = () => {
  return (
    <Router>
      <div>
        <AppBar position="static" style={appBarStyle}>
          <Container>
            <Tabs value="" aria-label="simple tabs example">
              <Tab label="Home" to="/" component={Link} style={tabStyle} value=""/>
              <Tab label="Create Task" to="/create" component={Link} style={tabStyle} value="/create"/>
            </Tabs>
          </Container>
        </AppBar>

        <Routes>
          <Route path="/create" element={<CreateTask />} />
          <Route path="/" element={<TaskList />} />
        </Routes>
      </div>
    </Router>
  );
};

// Styles
const appBarStyle = {
  marginBottom: '20px', // Adjust the margin as needed
};

const tabStyle = {
  textDecoration: 'none',
  color: 'inherit',
};

export default App;
