// DynamicIcon.js
import React from 'react';
import * as Icons from '@mui/icons-material';

interface IconI{
iconName: string,
 
}
function DynamicIcon({ iconName, ...props }:IconI): JSX.Element|null {
  const IconComponent = Icons[iconName];
 
  if (!IconComponent) {
    console.error(`Icon "${iconName}" not found`);
    return null; // You can return a default icon or an empty element here
  }

  return <IconComponent {...props} fontSize='inherit'/>;
};

export default DynamicIcon;