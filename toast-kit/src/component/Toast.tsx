import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";
import "../style.css";
import { useEffect, type ElementType } from "react";
import { type ToastProps, type ToastType } from "./interface";

const toastIconsMap: Record<ToastType, { component: ElementType }> = {
  success: {
    component: FaCheckCircle,
  },
  error: {
    component: FaExclamationCircle,
  },
  warning: {
    component: FaExclamationCircle,
  },
  info: {
    component: FaInfoCircle,
  },
};

export function Toast({
  type,
  title,
  message,
  duration = 3000,
  position = "bottom-right",
  onClose,
}: ToastProps) {
  const { component: TypeIcon, ...iconParams } = toastIconsMap[type];

  useEffect(() => {
    const timeout = setTimeout(onClose, duration);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <aside
      className={`tk-toast tk-toast--${type} tk-toast--${position}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="tk-toast__icon" aria-hidden="true">
        {<TypeIcon {...iconParams} className={`tk-toast__icon--${type}`} />}
      </div>
      <div className="tk-toast__content">
        <h1 className="tk-toast__title">{title}</h1>
        <p className="tk-toast__message">{message}</p>
      </div>
      <button className="tk-toast__close" onClick={onClose}>
        <FaTimes
          size={16}
          className={`tk-toast__icon--${type}`}
          aria-hidden="true"
        />
      </button>
    </aside>
  );
}
