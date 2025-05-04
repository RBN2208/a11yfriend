'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Headline } from '@/components/ui-elements/text/Headline';
import TextInputField from '@/components/forms/elements/TextInputField';
import UIButton from '@/components/ui-elements/UIButton';
import { SupaBaseAudit } from '@/types/audit/types';
import TextAreaInputField from '@/components/forms/elements/TextAreaInputField';
import SelectField from '@/components/forms/elements/SelectField';
import { CONFORMANCE_OPTIONS, STATUS_OPTIONS, VERSION_OPTIONS } from '@/staticData/criteria';
import { useUIStore } from '@/stores/ui-store';
import { useRouter } from 'next/navigation';
import { createAudit } from '@/app/account/audits/clientActions';

type AuditFormData = Omit<SupaBaseAudit, 'id' | 'created_at' | 'updated_at' | 'user_id' | 'audit'>;

export default function CreateAuditForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { closeModal } = useUIStore();

  const { register, handleSubmit, formState: { errors }, setError } = useForm<AuditFormData>({
    defaultValues: {
      name: '',
      description: '',
      status: 'draft',
      customer: '',
      project_name: '',
      module: '',
      version: '2.0',
      conformance: 'A',
      miscellaneous: ''
    }
  });

  const onSubmit = async (formData: AuditFormData) => {
    setIsLoading(true);
    console.log(formData)
    try {
      const response = await createAudit(formData);

      if (response && !response.success && response.error !== null) {
        // @ts-ignore known, this is direct value of the field name send to BE
        setError(response.error.field, {
          type: "server",
          message: response.error.message,
        })
      } else {
        router.push('/account/audits');
      }
    } catch (error) {
      setError('root', {
        type: "server",
        message: "An unexpected error occurred. Please try again later."
      })
    } finally {
      setIsLoading(false);
      closeModal('createAuditForm');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <Headline title="Create a new audit"
                level={2}
                additionalClasses="text-center mb-6"
      />

      <form onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            autoComplete={"off"}
      >
        <TextInputField
          id="audit-name"
          label="Name"
          type="text"
          placeholder="Audit Name"
          fieldError={errors.name?.message || ""}
          {...register('name', {
            required: 'Name is required'
          })}
        />

        <TextAreaInputField
          id="audit-description"
          label="Description"
          placeholder="Description of the audit"
          fieldError={errors.description?.message || ""}
          {...register('description')}
        />

        <div hidden={true}>
          {/* to populate data */}
          <SelectField id="audit-status"
                       label="Status"
                       placeholder="Select"
                       {...register('status')}
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.key} value={option.value}>{option.value}</option>
            ))}
          </SelectField>
        </div>

        <div className="flex gap-4">
          <SelectField id="audit-version"
                       label="Version"
                       placeholder="Select"
                       wrapperClass="w-6/12"
                       {...register('version', {
                         required: "Select a version"
                       })}
          >
            {VERSION_OPTIONS.map((option) => (
              <option key={option.key} value={option.value}>{option.value}</option>
            ))}
          </SelectField>

          <SelectField id="audit-conformance"
                       label="Conformance"
                       placeholder="Select"
                       wrapperClass="w-6/12"
                       {...register('conformance', {
                         required: "Select an conformance level"
                       })}
          >
            {CONFORMANCE_OPTIONS.map((option) => (
              <option key={option.key} value={option.value}>{option.value}</option>
            ))}
          </SelectField>
        </div>

        <div className="flex gap-4">
          <TextInputField
            id="audit-customer"
            label="Customer"
            type="text"
            placeholder="Customer Name"
            wrapperClass="w-6/12"
            fieldError={errors.customer?.message || ""}
            {...register('customer', {
              required: 'Customer name is required'
            })}
          />

          <TextInputField
            id="audit-project"
            label="Project Name"
            type="text"
            placeholder="Project name"
            wrapperClass="w-6/12"
            fieldError={errors.project_name?.message || ""}
            {...register('project_name', {
              required: 'Project name is required'
            })}
          />
        </div>

        <TextInputField
          id="audit-module"
          label="Modul"
          type="text"
          hint="This could be the full page or a specific component of the page e.g. a Slider, Login Form..."
          fieldError={errors.module?.message || ""}
          {...register('module')}
        />

        <TextAreaInputField
          id="audit-miscellaneous"
          label="Miscellaneous"
          fieldError={errors.miscellaneous?.message || ""}
          {...register('miscellaneous')}
        />

        <UIButton
          label="Audit erstellen"
          isLoading={isLoading}
          type="submit"
        />
      </form>
    </div>
);
}
