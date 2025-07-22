import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import RequestOneTimeLoginForm from "@/components/form-components/forms/request-one-time-login-form";

export function ForgotPasswordModal() {
  return (
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="link">Forgot password?</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Reset your password</DialogTitle>
              <DialogDescription>
                Fill in your email address to reset your password. If you´re email address is registered, you will receive an email with a link to reset your password.
              </DialogDescription>
            </DialogHeader>
            <RequestOneTimeLoginForm />
          </DialogContent>
        </form>
      </Dialog>
  )
}
