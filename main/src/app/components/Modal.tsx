// components/Modal.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: 'success' | 'error';
}

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.75,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.75,
    transition: {
      duration: 0.2,
    },
  },
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, message, type }) => {
  const { t } = useTranslation();

  // Determine modal color based on type
  const modalColor = type === 'success' ? 'bg-secondary' : 'bg-primary';

  // Determine button style based on type
  const buttonStyle = type === 'success' ? 'btn-primary' : 'btn-secondary';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose} // Close modal when clicking on backdrop
        >
          <motion.div
            className="bg-background rounded-xl shadow-lg max-w-sm w-full p-6 relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="text-secondary hover:text-primary focus:outline-none"
                aria-label={t('modal.close')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className={`flex flex-col items-center`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${modalColor} text-background mb-4`}>
                {type === 'success' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <h2 className="text-xl font-semibold mb-2">{title}</h2>
              <p className="text-center">{message}</p>
              <button
                onClick={onClose}
                className={`mt-6 px-4 py-2 btn ${buttonStyle}`}
              >
                {t('modal.closeButton')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
