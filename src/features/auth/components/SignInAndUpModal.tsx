'use client'

import LoginForm from '@/features/auth/components/login-form';
import RegisterForm from '@/features/auth/components/register-form';
import { Card } from '@/shared/components/shadcn-components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/components/shadcn-components/ui/tabs';
import {ForgotPasswordModal} from "@/features/auth/components/ForgotPasswordModal";
import React from "react";
import {User as UserIcon} from "lucide-react";
import {Button} from "@/shared/components/shadcn-components/ui/button";
import DialogWrapper from "@/shared/components/shadn-wrappers/DialogWrapper";

export function SignInAndUpModal() {
  const label = 'Login or Register';

  const TriggerButton = () => (
      <Button size={label ? 'default' : 'icon'} title={"Login or Register"}>
        <UserIcon className="h-6 w-6"/>
        <span className="block sm:hidden">{label}</span>
      </Button>
  )

  return (
      <DialogWrapper
        title="Login or Register"
        description="Login with your email address and password or register a new account."
        dialogTrigger={TriggerButton()}
      >
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
          </Tabs>

        </Card>
      </DialogWrapper>
  )
}
