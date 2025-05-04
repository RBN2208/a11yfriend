'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { passwordPattern } from '@/utils/helpers';
import UIButton from '@/components/ui-elements/UIButton';
import { changePassword } from '@/app/auth/reset/actions';
import SectionWrapper from '@/components/layout/SectionWrapper';
import UILink from '@/components/ui-elements/UILink';
import StateMessage from '@/components/ui-elements/messages/StateMessage';

type FormData = {
  password: string,
  confirmPassword: string,
}

export default function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, setError, formState, getValues, reset, handleSubmit } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
  });

  const onChangePasswordSubmit = async (formData: FormData) => {
    setIsLoading(true);

    const response = await changePassword(formData.password);
    if (response && !response.success && response.error !== null) {
      // @ts-ignore known, this is direct value of the field name send to BE
      setError(response.error.field, {
        type: "server",
        message: response.error.message,
      })
    }

    setSuccess(true);
    reset();
    setIsLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SectionWrapper>
      <div className="w-1/2 p-6 h-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Change password</h2>
        {success ? (
          <StateMessage title="Congratulations" message="Your password has been changed successfully. You can now sign in with your new password.">
            <UILink label="Login" href="/login" additionalClass="w-max" />
          </StateMessage>
        ) : (
        <form onSubmit={handleSubmit(onChangePasswordSubmit)} className="space-y-4">
          <div>
            <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                {...register('password', {
                  required: 'Password is required',
                  pattern: {
                    value: passwordPattern,
                    message: 'Password must be at least 8 characters with 1 number and 1 special character'
                  }
                })}
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
              </button>
            </div>
            {formState.errors.password && (
              <p className="mt-1 text-sm text-red-600">{formState.errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="register-confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Confirm
              Password</label>
            <div className="relative">
              <input
                id="register-confirm-password"
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value => value === getValues('password') || 'Passwords do not match'
                })}
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
              </button>
            </div>
            {formState.errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{formState.errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              id="register-show-password"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={showPassword}
              onChange={togglePasswordVisibility}
            />
            <label htmlFor="register-show-password" className="ml-2 block text-sm text-gray-700">
              Show password
            </label>
          </div>

          <UIButton label="Change password"
                    isLoading={isLoading}
                    type="submit"
          />
        </form>
        )}
      </div>
    </SectionWrapper>
  );
}
