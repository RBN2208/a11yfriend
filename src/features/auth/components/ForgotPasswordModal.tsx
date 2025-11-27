import { Button } from "@/shared/components/shadcn-components/ui/button"
import RequestOneTimeLoginForm from "@/features/auth/components/request-one-time-login-form";
import DialogWrapper from "@/shared/components/shadn-wrappers/DialogWrapper";

export function ForgotPasswordModal() {
  return (
      <DialogWrapper
          title="Reset your password"
          description="Fill in your email address to reset your password. If you´re email address is registered, you will receive an email with a link to reset your password."
          dialogTrigger={<Button variant="link">Forgot password?</Button>}
      >
        <RequestOneTimeLoginForm />
      </DialogWrapper>
  )
}
