import React from 'react';

export default function LoadingSpinner({ size = 'md', color = 'orange', fullScreen = false }) {
  // Size variants
  const sizeMap = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4'
  };

  // Color variants
  const colorMap = {
    orange: 'border-orange-500',
    blue: 'border-blue-500',
    green: 'border-green-500',
    red: 'border-red-500',
    gray: 'border-gray-500',
    white: 'border-white'
  };

  const spinnerSize = sizeMap[size] || sizeMap.md;
  const spinnerColor = colorMap[color] || colorMap.orange;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
        <div className={`${spinnerSize} rounded-full border-t-transparent animate-spin ${spinnerColor}`}></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className={`${spinnerSize} rounded-full border-t-transparent animate-spin ${spinnerColor}`}></div>
    </div>
  );
}