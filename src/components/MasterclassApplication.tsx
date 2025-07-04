import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Button from "./Button"
import MasterclassForm from "./MasterclassForm"

export default function MasterclassApplication() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button as="button" type="Primary" theme="Light">
          Register Now
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle>Masterclass Registration Form</DialogTitle>
          <DialogDescription>
            Please provide your name and email below to register.
          </DialogDescription>
        </DialogHeader>

        <MasterclassForm />
      </DialogContent>
    </Dialog>
  )
}
