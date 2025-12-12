"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/shared/components/shadcn-components/ui/button"
import { Form } from "@/shared/components/shadcn-components/ui/form"
import React, { useState } from 'react';
import { AlertCircleIcon, BadgeCheckIcon, Loader2} from 'lucide-react';
import { passwordSchema, emailSchema, loginSchema } from '@/features/auth/zod-schema';
import { signUp } from '@/features/auth/actions/actions';
import AlertWrapper from "@/shared/components/shadn-wrappers/AlertWrapper";
import { InputElement } from "@/shared/components/form-components/elements/form-elements";
import {toast} from "sonner";

const formSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: passwordSchema
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),
    reValidateMode: 'onBlur',
    mode: 'onBlur',
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    }
  })

  async function onSubmit(values: z.infer < typeof formSchema > ) {
    setLoading(true);
    try {
      const response = await signUp(values.email, values.password);

      if (response.errors) {
        response.errors.forEach(error => {
          form.setError(
              error.field as keyof z.infer<typeof loginSchema>,
              {message: error.error}
          )
        })
      }

      if (response.success) {
        setSuccess(true);
        toast.success(response.message);
      }
    } catch (error) {
      form.setError('root', error || "");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">

        <InputElement label="E-Mail"
                      required={true}
                      name="email"
                      type="email"
        />

        <InputElement label="Password"
                      required={true}
                      name="password"
                      type="password"
        />

        <InputElement label="Confirm password"
                      required={true}
                      name="confirmPassword"
                      type="password"
        />


        <Button disabled={loading} className="w-full mt-4">
          {loading && <Loader2 className="animate-spin" />}
          {loading ? 'Registering your account' : 'Register'}
        </Button>

        {form.formState.errors && form.formState.errors.root &&
            <AlertWrapper
                title="Sorry, we could not create your Account"
                variant="destructive"
                icon={<AlertCircleIcon />}
            >
              {form.formState.errors.root.message}
            </AlertWrapper>
        }

        {success &&
            <AlertWrapper
                title="Congratulation!"
                variant="default"
                icon={<BadgeCheckIcon />}
            >
                Your account has been created. Please check your email to verify your account and to proceed with login
            </AlertWrapper>
        }
      </form>
    </Form>
  )
}
