import { PlusIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

export default function ConfirmationDialog({
  title,
  icon,
  description,
  confirmButtonText,
  cancelButtonText,
}: {
  title: string;
  icon?: React.ReactNode;
  description: string;
  confirmButtonText: string;
  cancelButtonText: string;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <PlusIcon data-icon="inline-start" />
          {confirmButtonText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia>{icon}</AlertDialogMedia>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelButtonText}</AlertDialogCancel>
          <AlertDialogAction>{confirmButtonText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
