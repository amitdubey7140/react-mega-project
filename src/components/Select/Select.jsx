import React, { useId } from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="">
          {label}
        </label>
      )}

      <select
        {...props}
        id={id}
        className={`w-full px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 ${className}`}
      >
        {options?.map((option) => (
          <option value={option?.value}>{option?.label}</option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
