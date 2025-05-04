"use client"
import { toast } from "sonner"
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
import { passwordSchemaRegister, emailSchema } from '@/utils/validations/zod-schema';
import { PasswordInput } from '@/components/ui/password-input';
import { signUp } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  email: emailSchema,
  password: passwordSchemaRegister,
  confirmPassword: passwordSchemaRegister
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function RegisterForm() {
  const router = useRouter();
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
          form.setError(error.field, { message: error.errors[0] })
        })
      }

      if (response.ok) {
        setSuccess(true)
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
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!text-current">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  className={form.formState.errors.email ? "border-destructive" : ""}
                  type="email"
                  {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!text-current">
                Password
              </FormLabel>
              <FormControl>
                <PasswordInput className={form.formState.errors.password ? "border-destructive" : ""}
                               {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!text-current">
                Confirm Password
              </FormLabel>
              <FormControl>
                <PasswordInput className={form.formState.errors.confirmPassword ? "border-destructive" : ""}
                               {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} className="w-full mt-4">
          {loading && <Loader2 className="animate-spin" />}
          {loading ? 'Registering your account' : 'Register'}
        </Button>

        {form.formState.errors && form.formState.errors.root &&
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Sorry, we could not create your Account</AlertTitle>
            <AlertDescription>
              {form.formState.errors.root.message}
            </AlertDescription>
          </Alert>
        }

        {success &&
          <Alert variant="default">
            <AlertTitle>Congratulation!</AlertTitle>
            <AlertDescription>
              Your account has been created. Please check your email to verify your account and to proceed with login
            </AlertDescription>
          </Alert>
        }
      </form>
    </Form>
  )
}
