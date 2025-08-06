"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/shadcn-components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-components/ui/form"
import React, {useEffect, useState} from 'react';
import {AlertCircle, AlertCircleIcon, BadgeCheckIcon, Loader2} from 'lucide-react';
import { passwordSchemaLogin } from '@/utils/validations/zod-schema';
import { PasswordInput } from '@/components/shadcn-components/ui/password-input';
import { changePassword } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/shadcn-components/ui/alert';
import AlertWrapper from "@/components/shadn-wrappers/AlertWrapper";
import {InputElement} from "@/components/form-components/elements/form-elements";

const formSchemaBase = z.object({
  newPassword: passwordSchemaLogin,
  confirmNewPassword: passwordSchemaLogin
});

const formSchema = formSchemaBase
    .refine(({ newPassword, confirmNewPassword }) => newPassword === confirmNewPassword, {
      message: 'Passwords must match',
      path: [ 'confirmNewPassword' ],
    })

export default function ChangePasswordForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),
    reValidateMode: 'onBlur',
    mode: 'onBlur',
    defaultValues: {
      newPassword: "",
      confirmNewPassword: ""
    }
  })

  async function onSubmit(values: z.infer < typeof formSchema > ) {
    setLoading(true);
    try {
      const response = await changePassword(values.newPassword);

      if (response.errors) {
        response.errors.forEach(error => {
          form.setError(error.field, { message: error.errors[0] });
        })
        setLoading(false);
      }

      if (response.ok) {
        setSuccess(true);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      form.setError('root', error || "");
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (success) {
        setSuccess(false);
      }
    }, 10000)
  }, [success]);

  if (success) {
    return (
        <AlertWrapper
            title="Congratulation!"
            variant="default"
            icon={<BadgeCheckIcon />}
        >
          Your password has been changed.
        </AlertWrapper>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">

        <InputElement label="New Password"
                      required={true}
                      name="newPassword"
                      type="password"
        />

        <InputElement label="Confirm new password"
                      required={true}
                      name="confirmNewPassword"
                      type="password"
        />

        <Button disabled={loading} className="w-max mt-4">
          {loading && <Loader2 className="animate-spin"/>}
          {loading ? 'Submitting' : 'Change password'}
        </Button>

        {form.formState.errors && form.formState.errors.root &&
            <AlertWrapper
                title="Sorry, an error occurred!"
                variant="destructive"
                icon={<AlertCircleIcon />}
            >
              {form.formState.errors.root.message}
            </AlertWrapper>
        }
      </form>
    </Form>
  )
}
