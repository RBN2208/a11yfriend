'use client'

import LoginForm from '@/components/form-components/login-form';
import RegisterForm from '@/components/form-components/register-form';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function SignInAndUpForm() {

  return (
    <div className="">
      <Card className="relative bg-card shadow-none border-0">

        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="register">
            <RegisterForm/>
          </TabsContent>

          <TabsContent value="login">
            <LoginForm/>
          </TabsContent>
        </Tabs>

      </Card>
    </div>
  )
}
