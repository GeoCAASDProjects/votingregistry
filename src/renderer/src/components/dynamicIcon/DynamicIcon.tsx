// DynamicIcon.js
import React from 'react';
import * as Icons from '@mui/icons-material';

interface IconI{
iconName: string|null,
}
function DynamicIcon({ iconName, ...props }:IconI): JSX.Element|null {
  const IconComponent = Icons[iconName ?? " "];
 
  if (!IconComponent) {
 
    return null; // You can return a default icon or an empty element here
  }

  return <IconComponent {...props} />;
};

export default DynamicIcon;