import toast from "react-hot-toast";

export const successToast = (message) =>
  toast.success(message, {
    style: {
      padding: "12px",
      background: "#e2fee2",
      color: "#242424",
      position: "top-right",
    },
  });

export const errorToast = (message) =>
  toast.error(message, {
    style: {
      padding: "12px",
      background: "#ffeaea",
      color: "#242424",
      position: "top-right",
    },
  });
