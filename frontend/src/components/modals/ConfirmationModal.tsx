import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type Props = {
  trigger: string | React.ReactNode;
  triggerClassName?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  handleConfirm?: () => void;
  handleReject?: () => void;
  confirmButtonText?: string;
  rejectButtonText?: string;
};

export const ConfirmationModal = ({
  trigger,
  triggerClassName,
  title,
  description,
  handleConfirm,
  handleReject,
  confirmButtonText = 'Accept',
  rejectButtonText = 'Cancel',
}: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className={triggerClassName}>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleReject}>{rejectButtonText}</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>{confirmButtonText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
