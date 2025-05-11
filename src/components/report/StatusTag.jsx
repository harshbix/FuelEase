import React from 'react';

const StatusTag = ({ status }) => {
  let bgColor = 'bg-gray-100';
  let textColor = 'text-gray-800';
  
  switch (status) {
    case 'active':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    case 'maintenance':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      break;
    case 'removed':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      break;
    case 'pending':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      break;
    default:
      break;
  }
  
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${bgColor} ${textColor}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusTag;
