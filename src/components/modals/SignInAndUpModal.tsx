'use client'

import LoginForm from '@/components/form-components/forms/login-form';
import RegisterForm from '@/components/form-components/forms/register-form';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {ForgotPasswordModal} from "@/components/modals/ForgotPasswordModal";
import React from "react";

export function SignInAndUpModal() {

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
            <ForgotPasswordModal />
          </TabsContent>

          <TabsContent value="forgot-password">Forgot</TabsContent>
        </Tabs>

      </Card>
    </div>
  )
}
