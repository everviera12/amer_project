import { useEffect, useState } from "react";
import Icon from "../Icons/Icon";

interface AlertProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteAlert: React.FC<AlertProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [fadeClass, setFadeClass] = useState("opacity-0 translate-y-10");

  useEffect(() => {
    setFadeClass(
      "transition-all transform opacity-100 translate-y-0 duration-500"
    );
  }, []);

  const handleConfirm = () => {
    setIsVisible(false);
    onConfirm();
  };

  const handleCancel = () => {
    setIsVisible(false);
    onCancel();
    setFadeClass(
      "transition-all transform opacity-0 translate-y-10 duration-500"
    );
    setTimeout(() => {
      setIsVisible(false);
    }, 1500);
  };

  return (
    isVisible && (
      <div
        className={`fixed -top-10 inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50`}
      >
        <div className={`bg-white rounded-lg shadow-lg p-6 w-96 ${fadeClass}`}>
          <div className="flex justify-center mb-4">
            <Icon name="confirmation_alert" className="size-10" />
          </div>

          <h3 className="text-xl font-semibold text-gray-800 text-center">
            {message}
          </h3>
          <div className="mt-6 flex justify-evenly space-x-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteAlert;
