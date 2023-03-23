import React, { ChangeEvent, FormEvent, forwardRef, useImperativeHandle, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from './Button';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from '../store/thunks/firebase';
import { toast } from 'react-toastify';
import { IoClose } from 'react-icons/io5';

const PasswordForm = forwardRef((props, ref) => {
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);

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

  const reauthenticate = async () => {
    try {
      if (auth.currentUser?.email) {
        const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
        await reauthenticateWithCredential(auth.currentUser, credential);
        toast.success('You can update your password now.');
        setOpen(false);
        document.body.style.overflow = 'auto';
      }
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        toast.error('Incorrect password.', {
          autoClose: 5000,
          toastId: 'incorrect',
        });
      } else if (error.code === 'auth/too-many-requests') {
        toast.error(
          'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.',
          {
            autoClose: 10000,
            toastId: 'disabled',
          }
        );
      } else {
        toast.error(error.message);
      }
    }
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    await reauthenticate();
  };

  return (
    <>
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
                transition: { duration: 0.2, delay: 0.4 },
              }}
              exit={{
                backdropFilter: 'brightness(100%) blur(0px)',
                transition: { duration: 0.2, delay: 0.4 },
              }}
              onClick={handleClose}
            />

            <motion.div
              className="modal-content modal-password"
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
              <form className="modal-login-container" onSubmit={handleLogin}>
                <label htmlFor="" className="modal-login-container-label">
                  Password
                </label>
                <input
                  type="password"
                  className="modal-login-container-input"
                  placeholder="********"
                  value={password}
                  onChange={handlePassword}
                />
              </form>
              <Button primary disabled={password.length < 6} onClick={handleLogin}>
                Log in
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

export default PasswordForm;
