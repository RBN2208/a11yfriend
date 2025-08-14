"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/shadcn-components/ui/button"
import {Form} from "@/components/shadcn-components/ui/form"
import React, { useState } from 'react';
import { AlertCircleIcon, Loader2 } from 'lucide-react';
import { emailSchema  } from '@/utils/validations/zod-schema';
import { oneTimeLoginWithOTP } from '@/actions/auth/auth';
import AlertWrapper from "@/components/shadn-wrappers/AlertWrapper";
import { TypographyP } from "@/components/typography/typography-elements";
import {InputElement} from "@/components/form-components/elements/form-elements";
import { oneTimeLoginSchema} from "@/actions/auth/schemas";

const formSchema = z.object({
  email: emailSchema
});

export default function RequestOneTimeLoginForm() {
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);

  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),
    reValidateMode: 'onBlur',
    mode: 'onBlur',
    defaultValues: {
      email: ""
    }
  })

  async function onSubmitMail(values: z.infer < typeof formSchema > ) {
    setLoading(true);
    try {
      const response = await oneTimeLoginWithOTP(values.email);
      if (response.errors) {
        response.errors.forEach(error => {
          form.setError(
              error.field as keyof z.infer<typeof oneTimeLoginSchema>,
              {message: error.error}
          )
        })
      }

      if (response.success) {
        setValid(true);
        setLoading(false)
      }
    } catch (error) {
      form.setError('root', error || "");
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitMail)} className="flex flex-col gap-4 p-4">

        {!valid &&
          <InputElement label="E-Mail"
                        required={true}
                        name="email"
                        type="email"
          />
        }

        {valid &&
            <TypographyP className="text-sm text-neutral-600 border border-green-500 p-4 rounded-md border-2 -m-4">
                If you´re email exists, we send you an magic link for a one-time login. Please change your password within your profile settings. You´re free to close this page.
            </TypographyP>
        }

        {!valid &&
          <Button disabled={loading} className="w-full mt-4">
            {loading && <Loader2 className="animate-spin"/>}
            {loading ? 'Submitting' : 'Reset password'}
          </Button>
        }

        {form.formState.errors && form.formState.errors.root &&
            <AlertWrapper
                title="Sorry, something went wrong"
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
