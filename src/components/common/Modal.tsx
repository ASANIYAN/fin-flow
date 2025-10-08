import { Icon } from "@iconify/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Confirmation Modal Component
interface ConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "default" | "destructive";
  isLoading?: boolean;
  icon?: string;
  iconColor?: string;
}

const ConfirmationModal = ({
  open,
  onOpenChange,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "default",
  isLoading = false,
  icon = "material-symbols:help-outline",
  iconColor = "#2563eb",
}: ConfirmationModalProps) => {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  const getConfirmButtonClasses = () => {
    if (confirmVariant === "destructive") {
      return "bg-error hover:bg-error/90 text-white";
    }
    return "bg-brand-primary hover:bg-brand-primary/90 text-white";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="!max-w-md rounded-lg pb-6 pt-0 px-0 font-poppins overflow-clip"
        role="alertdialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <DialogHeader className="flex flex-row items-center justify-end mb-4 w-full bg-gray-50 h-14 px-4">
          <DialogClose
            className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded-sm"
            aria-label="Close dialog"
          >
            <Icon
              icon="material-symbols:close"
              width={20}
              height={20}
              color="#6b7280"
              className="ml-auto"
              aria-hidden="true"
            />
          </DialogClose>
        </DialogHeader>

        <div className="w-full max-w-sm mx-auto text-center space-y-6 px-6">
          {/* Icon */}
          <div className="flex justify-center mb-4" aria-hidden="true">
            <Icon icon={icon} width={48} height={48} color={iconColor} />
          </div>

          {/* Title and Message */}
          <div className="space-y-3">
            <h2
              id="modal-title"
              className="text-lg font-semibold text-[--color-text-primary]"
            >
              {title}
            </h2>
            <p
              id="modal-description"
              className="text-[--color-text-secondary] text-sm"
            >
              {message}
            </p>
          </div>

          {/* Action Buttons */}
          <div
            className="flex gap-3 mt-6"
            role="group"
            aria-label="Dialog actions"
          >
            <Button
              variant="outline"
              className="flex-1 text-sm border cursor-pointer h-11 border-gray-300 bg-white hover:bg-gray-50 rounded-lg py-2 font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              aria-describedby="modal-description"
            >
              {cancelText}
            </Button>
            <Button
              className={`flex-1 rounded-lg text-sm py-2 h-11 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                confirmVariant === "destructive"
                  ? "focus:ring-red-500"
                  : "focus:ring-brand-primary"
              } ${getConfirmButtonClasses()}`}
              type="button"
              onClick={handleConfirm}
              disabled={isLoading}
              aria-describedby="modal-description"
            >
              {isLoading ? "Processing..." : confirmText}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
