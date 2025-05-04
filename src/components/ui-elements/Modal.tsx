'use client';

import React, { useEffect, useRef } from 'react';
import { useUIStore } from '@/stores/ui-store';
import UIButton from '@/components/ui-elements/UIButton';

type ModalProps = {
  modalKey: string;
  onClose?: () => void;
  useCustomClose?: boolean;
  cssClass?: string;
  children?: React.ReactNode;
};

export default function Modal({ modalKey, onClose, useCustomClose, cssClass, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = useUIStore((state) => state.isModalOpen(modalKey));
  const closeModal = useUIStore((state) => state.closeModal);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && dialog && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog?.open) {
      dialog.close();
    }
  }, [isOpen]);

  const handleClose = () => {
    closeModal(modalKey);
    onClose?.();
  };

  return (
    <dialog
      ref={dialogRef}
      className={`relative rounded-xl p-4 md:p4 lg:p-6 shadow-lg h-max w-full md:w-10/12 lg:w-8/12 ${cssClass}`}
    >
      {!useCustomClose &&
        <div className="absolute right-3 top-3 flex justify-end">
          <UIButton label="X" callBackAction={handleClose} btnClass="w-max" />
        </div>
      }
      {children}
    </dialog>
  );
}
