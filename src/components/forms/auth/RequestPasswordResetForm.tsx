'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { emailPattern } from '@/utils/helpers';
import UIButton from '@/components/ui-elements/UIButton';
import { requestPasswordResetEmail } from '@/app/auth/forgot/actions';
import SectionWrapper from '@/components/layout/SectionWrapper';
import UILink from '@/components/ui-elements/UILink';
import StateMessage from '@/components/ui-elements/messages/StateMessage';
import { Headline } from '@/components/ui-elements/text/Headline';
import TextInputField from '@/components/forms/elements/TextInputField';

type FormData = {
  email: string,
}

export default function PasswordResetForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const { register, setError, formState, reset, handleSubmit } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onResetSubmit = async (formData: FormData) => {
    setIsLoading(true);

    const form = new FormData();
    form.append("email", formData.email);

    try {
      const response = await requestPasswordResetEmail(form);

      if (response && !response.success && response.error !== null) {
        setError("email", {
          type: "server",
          message: response.error.message,
        });
      } else {
        setResetSent(true);
        reset();
      }
    } catch (error) {
      setError("email", {
        type: "server",
        message: "An error occurred. Please try again.",
      });
    }

    setIsLoading(false);
  };


  const headlineId = crypto.randomUUID();

  return (
    <SectionWrapper linkedHeading={headlineId}>
      <div className="w-4/12 mx-auto p-6 h-auto">
        <Headline title="Reset password" level={2} id={headlineId} additionalClasses="text-center mb-4"/>

        {resetSent ? (
          <StateMessage title="Congratulations" message="We've sent you an email with reset instructions. Please check your inbox.">
            <div className="flex gap-4">
              <UILink label="Login" href="/login" additionalClass="w-max" />
              <UILink label="Check out our blog" href="/blog" additionalClass="w-max" />
            </div>
          </StateMessage>
        ) : (
          <form onSubmit={handleSubmit(onResetSubmit)} className="space-y-4">
            <TextInputField id="reset-email"
                            label="Email"
                            type="email"
                            placeholder="your@email.com"
                            fieldError={formState.errors.email?.message || ""}
                            {...register('email', {
                              required: 'Email is required',
                              pattern: {
                                value: emailPattern,
                                message: 'Please enter a valid email address'
                              }
                            })}
            />

            <p className="text-sm text-gray-600">
              Enter the email address associated with your account, and we'll send you a link to reset your password.
            </p>

            <UIButton
              label="Send Reset Link"
              isLoading={isLoading}
              type="submit"
            />
          </form>
        )}
      </div>
    </SectionWrapper>
  );
}
