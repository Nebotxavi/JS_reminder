import { useEffect, useState } from "react";
import { Toast } from "./component/Toast";
import { createPortal } from "react-dom";
import type { ToastParams, ToastParamsWithId } from "./component/interface";

let addToast: (toast: ToastParamsWithId) => void;

export function ToastManager() {
  const [toasts, setToasts] = useState<ToastParamsWithId[]>([]);

  useEffect(() => {
    addToast = (toast) => setToasts((prev) => [...prev, toast]);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return createPortal(
    <div className="tk-toast-container">
      {toasts.map((toast) => (
        <Toast
          key={`toast-${toast.id}`}
          {...toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>,
    document.body
  );
}

export function showToast(toast: ToastParams) {
  const id = `${Date.now()}-${Math.random()}`;
  addToast({ ...toast, id });
}
