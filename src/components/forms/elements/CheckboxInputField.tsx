import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type CheckboxInputFieldProps = {
  id: string,
  label: string,
  readOnly?: boolean,
  hint?: string,
  required?: boolean,
  fieldError?: string,
  callbackAction?: (value: boolean) => void,
  isVisible?: boolean,
} & React.InputHTMLAttributes<HTMLInputElement>

export default function CheckboxInputField({id, label, readOnly, hint, required, placeholder, fieldError, callbackAction, ...props}: CheckboxInputFieldProps) {
  const [isChecked, setIsChecked] = useState(false);

  const inputClass = "px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500";
  const errorClass = fieldError ? " border-red-600" : " border-blue-900";
  const readOnlyClass = readOnly ? " p-0 text-black " : " border py-2 px-2 text-gray-700 ";

  const toggleChecked = (value: boolean) => {
    setIsChecked(!isChecked);
    callbackAction && callbackAction(value);
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <input
          id={id}
          type="checkbox"
          onChange={(e) => toggleChecked(e.target.checked)}
          className={`${inputClass} ${readOnlyClass} ${errorClass}`}
          {...props}
        />
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      </div>
      {fieldError && (
        <p className="mt-1 text-sm text-red-600">{fieldError}</p>
      )}
    </div>
  )
}
