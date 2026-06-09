import React from 'react';
import { SelectOption } from '../types'; // Removed 'type' keyword

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  id?: string;
  options: SelectOption[];
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ label, id, options, className = '', ...props }) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s/g, '-') : undefined);
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-text-primary mb-1">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-blue focus:border-primary-blue sm:text-sm ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;