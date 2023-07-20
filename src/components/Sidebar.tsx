import React, { useState } from 'react';
import { Box, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';

const SidebarContainer = styled(motion.div)`
  background-color: #1A120B;
  color: white;
  width: 240px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
`;

interface SidebarProps {
  onOptionClick: (option: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({onOptionClick}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onOptionClick(option);
  };

  return (
    <SidebarContainer
      initial={{ width: 240 }}
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        sx={{ color: 'white', p: 0, mb: 4 }}
        onClick={toggleCollapse}
      >
        {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </Button>
      {!collapsed && (
        <List sx={{ width: '100%' }}>
          <ListItem
            button
            sx={{
              paddingLeft: 0,
              '&:hover': {
                backgroundColor: '#666',
              },
              backgroundColor: selectedOption === 'optionPricing' ? '#777' : 'transparent',
            }}
            onClick={() => handleOptionClick('optionPricing')}
          >
            <ListItemIcon sx={{ color: 'white' }}>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Option Pricing" />
          </ListItem>
          <ListItem
            button
            sx={{
              paddingLeft: 0,
              '&:hover': {
                backgroundColor: '#666',
              },
              backgroundColor: selectedOption === 'comparison' ? '#777' : 'transparent',
            }}
            onClick={() => handleOptionClick('comparison')}
          >
            <ListItemIcon sx={{ color: 'white' }}>
              <CompareArrowsIcon />
            </ListItemIcon>
            <ListItemText primary="Comparison" />
          </ListItem>
        </List>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
