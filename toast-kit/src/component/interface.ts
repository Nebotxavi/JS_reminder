export type ToastType = "success" | "error" | "warning" | "info";
export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

export interface ToastParams {
  message: string;
  title: string;
  type: ToastType;
  duration?: number;
  position?: ToastPosition;
}

export interface ToastParamsWithId extends ToastParams {
  id: string;
}

export interface ToastProps extends ToastParamsWithId {
  onClose: () => void;
}
