"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import React, { useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { emailSchema, passwordSchemaLogin } from '@/utils/validations/zod-schema';
import { PasswordInput } from '@/components/ui/password-input';
import { signIn } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {ForgotPasswordModal} from "@/components/modals/ForgotPasswordModal";

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

        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel className="!text-current">
                Email
              </FormLabel>
              <FormControl>
                <Input placeholder=""
                       type="email"
                       className={form.formState.errors.email ? "border-destructive" : ""}
                       {...field}
                />
              </FormControl>

              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <FormItem>
              <FormLabel className="!text-current">
                Password
              </FormLabel>
              <FormControl>
                <PasswordInput className={form.formState.errors.password ? "border-destructive" : ""}
                               {...field}
                />
              </FormControl>

              <FormMessage/>
            </FormItem>
          )}
        />

        <Button disabled={loading} className="w-full mt-4">
          {loading && <Loader2 className="animate-spin"/>}
          {loading ? 'Logging in' : 'Login'}
        </Button>

        {form.formState.errors && form.formState.errors.root &&
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Sorry, we could not log you in.</AlertTitle>
            <AlertDescription>
              {form.formState.errors.root.message}
            </AlertDescription>
          </Alert>
        }
      </form>
    </Form>
  )
}
