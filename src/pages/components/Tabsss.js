import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dashboard from '../dashboard';
import Posts from '../posts';
import Users from '../users';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography variant='h5'>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function Tabsss() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper',}}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="danger"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Dashboard" {...a11yProps(0)} />
          <Tab label="Posts" {...a11yProps(1)} />
          <Tab label="Users" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      
      <TabPanel value={value} index={0} dir={theme.direction}>
        <Dashboard />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Posts />
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <Users />
      </TabPanel>
    </Box>
  );
}

export default Tabsss;