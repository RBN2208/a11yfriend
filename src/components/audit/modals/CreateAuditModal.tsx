'use client'

import { useUIStore } from '@/stores/ui-store';
import UIButton from '@/components/ui-elements/UIButton';
import Modal from '@/components/ui-elements/Modal';
import CreateAuditForm from '@/components/forms/audit/CreateAuditForm';

export default function CreateAuditModal() {
  const { openModal } = useUIStore();

  return (
    <>
      <UIButton label="Create new audit"
                type="button"
                btnClass="w-max"
                callBackAction={() => openModal('createAuditForm')}
      />

      <Modal modalKey={'createAuditForm'} cssClass="!w-max">
        <CreateAuditForm />
      </Modal>
    </>
  )
}
