import React from 'react';

type TextInputFieldProps = {
  id: string,
  label: string,
  children?: React.ReactNode,
  readOnly?: boolean,
  hint?: string,
  required?: boolean,
  placeholder?: string,
  fieldError?: string
  wrapperClass?: string,
} & React.InputHTMLAttributes<HTMLSelectElement>

export default function SelectField({id, label, children, readOnly, hint, required, placeholder, fieldError, wrapperClass = "", ...props}: TextInputFieldProps) {

  const inputClass = "w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500";
  const errorClass = fieldError ? " border-red-600" : " border-blue-900";
  const readOnlyClass = readOnly ? " p-0 text-black " : " border py-2 px-2 text-gray-700 ";

  return (
    <div className={wrapperClass}>
      <label htmlFor={id}
             className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-800">*</span>}
      </label>
      <select id={id}
              name={id}
              disabled={readOnly}
              className={inputClass + readOnlyClass + errorClass}
              {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select>
      {hint &&
        <p className="mt-1 text-sm text-gray-600">{hint}</p>
      }
      {fieldError && (
        <p className="mt-1 text-sm text-red-600">{fieldError}</p>
      )}
    </div>
  )
}
