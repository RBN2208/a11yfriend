'use client'
import React from 'react';
import { RefreshCcw } from 'lucide-react';

type UIButtonProps = {
  label?: string,
  isLoading?: boolean,
  title?: string,
  type?: 'button' | 'submit',
  btnClass?: string,
  callBackAction?: (...data: any) => void,
  children?: React.ReactNode,
}

export default function UIButton(
  {
    label,
    isLoading = false,
    title = label,
    type = 'button',
    btnClass = "",
    callBackAction,
    children,
  } : UIButtonProps) {

  const baseClass = "flex justify-center block relative transition-all w-full duration-300 ease-in-out bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-offset-2";
  const buttonClass = baseClass + ' ' + btnClass;

  const handleClick = (e: any) => {
    callBackAction && callBackAction(e);
  }

  return (
    <button className={buttonClass}
            type={type}
            disabled={isLoading}
            onClick={handleClick}
            title={title}
    >
      { isLoading ?
        <RefreshCcw className="animate-reverse-spin" size={25} /> :
        <>
          {children ?
            children :
            label
          }
        </>
      }
    </button>
  )
}
