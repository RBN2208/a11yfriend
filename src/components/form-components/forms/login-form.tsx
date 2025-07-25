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
import { Input } from "@/components/shadcn-components/ui/input"
import React, { useState } from 'react';
import {AlertCircle, AlertCircleIcon, Loader2} from 'lucide-react';
import { emailSchema, passwordSchemaLogin } from '@/utils/validations/zod-schema';
import { PasswordInput } from '@/components/shadcn-components/ui/password-input';
import { signIn } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/shadcn-components/ui/alert';
import {ForgotPasswordModal} from "@/components/modals/ForgotPasswordModal";
import AlertWrapper from "@/components/shadn-wrappers/AlertWrapper";
import {InputElement} from "@/components/form-components/elements/form-elements";

const formSchema = z.object({
  email: emailSchema,
  password: passwordSchemaLogin
});

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),
    reValidateMode: 'onBlur',
    mode: 'onBlur',
    defaultValues: {
      email: "",
      password: ""
    }
  })

  async function onSubmit(values: z.infer < typeof formSchema > ) {
    setLoading(true);
    try {
      const response = await signIn(values.email, values.password);

      if (response.errors) {
        response.errors.forEach(error => {
          form.setError(error.field, { message: error.errors[0] })
        })
      }

      if (response.ok) {
        router.push('/account');
      }
    } catch (error) {
      form.setError('root', error || "")
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

        <Button disabled={loading} className="w-full mt-4">
          {loading && <Loader2 className="animate-spin"/>}
          {loading ? 'Logging in' : 'Login'}
        </Button>

        {form.formState.errors && form.formState.errors.root &&
            <AlertWrapper
                title="Sorry, we could not log you in."
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
