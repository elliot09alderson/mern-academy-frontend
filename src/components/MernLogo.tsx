import React from 'react';

interface MernLogoProps {
  className?: string;
  size?: number;
}

export const MernLogo: React.FC<MernLogoProps> = ({ className = '', size = 24 }) => {
  return (
    <img
      src="/short-logo.png"
      alt="MERN Academy"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
};
