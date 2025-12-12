"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/shared/components/shadcn-components/ui/button"
import {Form} from "@/shared/components/shadcn-components/ui/form"
import React, { useEffect, useState } from 'react';
import { AlertCircleIcon, BadgeCheckIcon, Loader2 } from 'lucide-react';
import { passwordSchema } from '@/features/auth/zod-schema';
import { changePassword } from '@/features/auth/actions/actions';
import AlertWrapper from "@/shared/components/shadn-wrappers/AlertWrapper";
import { InputElement } from "@/shared/components/form-components/elements/form-elements";
import { useTranslations } from "next-intl";

const formSchemaBase = z.object({
  newPassword: passwordSchema,
  confirmNewPassword: passwordSchema
});

const formSchema = formSchemaBase
    .refine(({ newPassword, confirmNewPassword }) => newPassword === confirmNewPassword, {
      message: 'Passwords must match',
      path: [ 'confirmNewPassword' ],
    })

export default function ChangePasswordForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const t = useTranslations('auth');

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
          form.setError(
              error.field as keyof z.infer<typeof formSchemaBase>,
              {message: error.error}
          )
        })
        setLoading(false);
      }

      if (response.success) {
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
            title={t('success')}
            variant="success"
            icon={<BadgeCheckIcon />}
        >
          {t('passwordChangedSuccessfully')}
        </AlertWrapper>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">

        <InputElement label={t('newPassword')}
                      required={true}
                      name="newPassword"
                      type="password"
        />

        <InputElement label={t('confirmNewPassword')}
                      required={true}
                      name="confirmNewPassword"
                      type="password"
        />

        <Button disabled={loading} className="w-max mt-4">
          {loading && <Loader2 className="animate-spin"/>}
          {loading ? t('saving') : t('confirmPassword')}
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
