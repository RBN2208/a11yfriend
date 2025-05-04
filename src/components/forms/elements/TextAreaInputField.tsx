import React from 'react';

type TextInputFieldProps = {
  id: string,
  label: string,
  readOnly?: boolean,
  hint?: string,
  required?: boolean,
  placeholder?: string,
  fieldError?: string
} & React.InputHTMLAttributes<HTMLTextAreaElement>

export default function TextAreaInputField({id, label, readOnly, hint, required, placeholder, fieldError, ...props}: TextInputFieldProps) {

  const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500";
  const errorClass = fieldError ? " border-red-600" : " border-blue-900";
  const readOnlyClass = readOnly ? " p-0 text-black " : " border py-2 px-2 text-gray-700 ";

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-800">*</span>}
      </label>
      <textarea
        id={id}
        rows={4}
        className={`${inputClass} ${readOnlyClass} ${errorClass}`}
        placeholder={placeholder}
        disabled={readOnly}
        {...props}
      />
      {hint &&
        <p className="mt-1 text-sm text-gray-600">{hint}</p>
      }
      {fieldError && (
        <p className="mt-1 text-sm text-red-600">{fieldError}</p>
      )}
    </div>
  )
}
