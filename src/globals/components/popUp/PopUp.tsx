import React from "react";

interface PopUpProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    showCancelButton?: boolean;
}

const PopUp: React.FC<PopUpProps> = ({
    isOpen,
    onClose,
    title,
    children,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    showCancelButton = true,
}) => {
    if (!isOpen) return null; // Do not render if modal is not open

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 dark:bg-gray-700">
                {/* Header */}
                {title && (
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                        {title}
                    </h3>
                )}

                {/* Content */}
                <div className="text-gray-600 dark:text-gray-300 mb-6">{children}</div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4">
                    {showCancelButton && (
                        <button
                            onClick={onClose}
                            className="py-2 px-4 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none"
                        >
                            {cancelText}
                        </button>
                    )}
                    {onConfirm && (
                        <button
                            onClick={onConfirm}
                            className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
                        >
                            {confirmText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PopUp;
