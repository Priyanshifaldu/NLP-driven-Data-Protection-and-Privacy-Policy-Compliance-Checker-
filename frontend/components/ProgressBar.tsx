
import React from 'react';

interface ProgressBarProps {
  progress: number; // 0-100
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className = '' }) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const progressColor =
    clampedProgress >= 70
      ? 'bg-success-green'
      : clampedProgress >= 40
      ? 'bg-warning-orange'
      : 'bg-danger-red';

  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div
        className={`${progressColor} h-2 rounded-full`}
        style={{ width: `${clampedProgress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
