import { forwardRef, ReactNode, useImperativeHandle, useState } from 'react';
import { motion, AnimatePresence, filterProps } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import className from 'classnames';

type ModalProps = {
  children: ReactNode;
  login?: boolean;
};

const Modal = forwardRef(({ children, login }: ModalProps, ref) => {
  const [open, setOpen] = useState(false);

  const classes = className('modal-content', {
    'modal-content-login': login,
  });

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        setOpen(true);
        document.body.style.overflow = 'hidden';
      },
      close: () => {
        setOpen(false);
        document.body.style.overflow = 'auto';
      },
    };
  });

  const handleClose = () => {
    setOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="modal-backdrop"
            initial={{
              backdropFilter: 'brightness(100%) blur(0px)',
            }}
            animate={{
              backdropFilter: 'brightness(25%) blur(10px)',
              transition: { duration: 0.2 },
            }}
            exit={{
              backdropFilter: 'brightness(100%) blur(0px)',
              transition: { duration: 0.2, delay: 0.4 },
            }}
            onClick={handleClose}
          />
          <motion.div
            className={classes}
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: { duration: 0.2, delay: 0.2 },
            }}
            exit={{
              scale: 0,
              opacity: 0,
              transition: { duration: 0.2, delay: 0.2 },
            }}
          >
            <IoClose className="modal-content-icon" onClick={handleClose} />
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

export default Modal;
