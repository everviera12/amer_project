import { useState, useEffect } from "react";
import clsx from "clsx";
import Icon from "./Icons/Icon";
import { NotificationProps } from "@/typescript/interface";

const Alert: React.FC<NotificationProps> = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [fadeClass, setFadeClass] = useState("opacity-0 translate-y-10");

  useEffect(() => {
    setFadeClass("transition-all transform opacity-100 translate-y-0 duration-500");
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const closeNotification = () => {
    setFadeClass("transition-all transform opacity-0 translate-y-10 duration-500");

    setTimeout(() => {
      setIsVisible(false);
    }, 500); 
  };

  const getIcon = () => {
    switch (type) {
      case "delete":
        return "delete";
      case "error":
        return "error";
      case "create":
        return "alert";
      case "warning":
        return "warning";
      default:
        return "alert";
    }
  };

  return (
    isVisible && (
      <div
        className={clsx(
          "fixed top-5 right-5 text-white py-3 px-6 rounded-lg flex justify-between items-center shadow-lg z-50",
          fadeClass,
          {
            "bg-red-500": type === "delete" || type === "error",
            "bg-green-500": type === "create",
            "bg-yellow-500 text-black": type === "warning",
          }
        )}
      >
        <div className="flex items-center gap-5">
          <Icon name={getIcon()} className="size-6" />

          <span>{message}</span>

          <button
            className="text-white text-xl hover:text-gray-200"
            onClick={closeNotification}
          >
            <Icon name="alert-close" className="size-6" />
          </button>
        </div>
      </div>
    )
  );
};

export default Alert;
