import React, { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type TextInputFieldProps = {
  id: string,
  label: string,
  readOnly?: boolean,
  hint?: string,
  required?: boolean,
  placeholder?: string,
  fieldError?: string,
  isVisible?: boolean,
} & React.InputHTMLAttributes<HTMLInputElement>

export default function PasswordInputField({id, label, readOnly, hint, required, placeholder, fieldError, isVisible = false, ...props}: TextInputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500";
  const errorClass = fieldError ? " border-red-600" : " border-blue-900";
  const readOnlyClass = readOnly ? " p-0 text-black " : " border py-2 px-2 text-gray-700 ";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setShowPassword(isVisible)
  }, [isVisible]);

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          className={`${inputClass} ${readOnlyClass} ${errorClass}`}
          placeholder={placeholder}
          {...props}
        />
        <button
          type="button"
          className="absolute right-3 top-2.5 text-gray-500"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
        </button>
      </div>
      {fieldError && (
        <p className="mt-1 text-sm text-red-600">{fieldError}</p>
      )}
    </div>
  )
}
