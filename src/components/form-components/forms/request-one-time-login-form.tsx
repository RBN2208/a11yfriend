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
import { emailSchema  } from '@/utils/validations/zod-schema';
import {oneTimeLoginWithOTP} from '@/actions/auth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
          form.setError(error.field, { message: error.errors[0] })
        })
      }

      if (response.ok) {
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
        }

        {valid &&
            <p className="text-sm text-neutral-600 border border-green-500 p-4 rounded-md border-2 -m-4">
                If you´re email exists, we send you an magic link for a one-time login. Please change your password within your profile settings. You´re free to close this page.
            </p>
        }

        {!valid &&
          <Button disabled={loading} className="w-full mt-4">
            {loading && <Loader2 className="animate-spin"/>}
            {loading ? 'Submitting' : 'Reset password'}
          </Button>
        }

        {form.formState.errors && form.formState.errors.root &&
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Sorry, something went wrong</AlertTitle>
            <AlertDescription>
              {form.formState.errors.root.message}
            </AlertDescription>
          </Alert>
        }
      </form>
    </Form>
  )
}
