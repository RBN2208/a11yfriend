'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Headline } from '@/components/ui-elements/text/Headline';
import UIButton from '@/components/ui-elements/UIButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from '@/components/ui-elements/Modal';
import { useUIStore } from '@/stores/ui-store';
import { deleteAudit } from '@/app/account/audits/actions';

interface AuditMenuProps {
  auditId: string
  auditName: string
}

export default function DeleteAuditModal({ auditId, auditName }: AuditMenuProps) {
  const router = useRouter();
  const { openModal, closeModal, isModalOpen } = useUIStore();
  const isOpen = isModalOpen('deleteAudit');

  const handleDelete = async () => {
    const response = await deleteAudit(auditId);
    closeModal('deleteAudit');
    router.refresh();
  }

  return (
    <>
      <UIButton btnClass="w-max bg-transparent hover:bg-transparent hover:scale-125 transition duration-150"
                callBackAction={() => isOpen ? closeModal('deleteAudit') : openModal('deleteAudit')}
      >
        <FontAwesomeIcon icon={faTrash}
                         className="text-blue-900 cursor-pointer"
        />
      </UIButton>

      <Modal modalKey={'deleteAudit'}
             useCustomClose={true}
             cssClass="!w-max"
      >
        <div className="flex flex-col justify-center bg-white rounded-lg p-6 max-w-md w-full">
          <Headline title="Delete audit" level={3}/>
          <p className="text-gray-500 mb-4">Are you sure you want to delete "{auditName}"? This action can´t be
            reverted.</p>
          <div className="flex justify-end space-x-3">
            <UIButton
              label="Cancel"
              callBackAction={() => closeModal('deleteAudit')}
              type="button"
              btnClass="bg-gray-800 hover:bg-gray-600"
            />
            <UIButton
              label="Delete"
              callBackAction={handleDelete}
              type="button"
              btnClass="bg-red-600 hover:bg-red-700"
            />
          </div>
        </div>
      </Modal>
    </>
  )
}
