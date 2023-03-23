import { AnimatePresence, motion } from 'framer-motion';
import { ChangeEvent, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { auth, updateUserData } from '../store/thunks/firebase';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Button from './Button';
import { updateUser } from '../store';
import { toast } from 'react-toastify';
import { updatePassword } from 'firebase/auth';
import { ModalRefProps } from '../Types';
import PasswordForm from './PasswordForm';
import { IoClose } from 'react-icons/io5';

const SettingsForm = forwardRef((props, ref) => {
  const { displayName, email, photoURL, uid } = useAppSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [changedData, setChangedData] = useState({
    displayName: displayName || '',
    photoURL: photoURL || '',
  });
  const [newPassword, setNewPassword] = useState<string>('');
  const newPasswordRef = useRef<ModalRefProps>(null);

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangedData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const updateUserPassword = async (newPassword: string) => {
    try {
      if (auth.currentUser) {
        await updatePassword(auth.currentUser, newPassword);
        setOpen(false);
        toast.success('Password updated!');
        setNewPassword('');
        document.body.style.overflow = 'auto';
      }
    } catch (error: any) {
      if (error.code === 'auth/requires-recent-login') {
        toast.error('Please enter your current password to continue this action.', {
          autoClose: 5000,
        });
        setOpen(false);
        newPasswordRef.current?.open();
      } else if (error.code === 'auth/weak-password') {
        toast.error('The password must be 6 characters long or more.', {
          autoClose: 7500,
          toastId: 'weak-password',
        });
      } else {
        toast.error(error.message);
      }
    }
  };

  const handlePasswordUpdate = async () => {
    await updateUserPassword(newPassword);
    setNewPassword('');
  };

  const handleSave = async () => {
    const userData = await updateUserData(changedData.displayName, changedData.photoURL);

    if (userData && typeof userData === 'object') {
      const { displayName, photoURL } = userData;
      const obj = {
        displayName,
        photoURL,
      };
      dispatch(updateUser(obj));
    }
  };

  return (
    <>
      <PasswordForm ref={newPasswordRef} />

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
                  transition: { duration: 0.2 },
                }}
                exit={{
                  backdropFilter: 'brightness(100%) blur(0px)',
                  transition: { duration: 0.2, delay: 0.4 },
                }}
                onClick={handleClose}
              />
              <motion.div
                className="modal-content modal-content-login"
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

                <motion.div
                  className="modal-login"
                  initial={{
                    x: -15,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    transition: { duration: 0.2, delay: 0.4 },
                  }}
                  exit={{
                    x: -15,
                    opacity: 0,
                    transition: { duration: 0.2 },
                  }}
                >
                  <h1 className="modal-login-title">Settings</h1>

                  <div className="modal-content-wrapper">
                    <img
                      src={photoURL || '/person.png'}
                      alt={`${displayName || email}'s profile picture.`}
                      className="modal-content-wrapper-image"
                    />
                    <div className="modal-content-wrapper-inputs">
                      <div className="modal-login-container">
                        <label htmlFor="name" className="modal-login-container-label">
                          Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          value={changedData.displayName}
                          name="displayName"
                          id="name"
                          maxLength={16}
                          onChange={handleChange}
                          className="modal-login-container-input"
                        />
                      </div>
                      <div className="modal-login-container">
                        <label htmlFor="photourl" className="modal-login-container-label">
                          Photo URL
                        </label>
                        <input
                          type="url"
                          placeholder="https://pbs.twimg.com/profile_images/446356636710363136/OYIaJ1KK_400x400.png"
                          value={changedData.photoURL || ''}
                          name="photoURL"
                          id="photourl"
                          onChange={handleChange}
                          className="modal-login-container-input"
                        />
                      </div>
                      <div className="modal-content-form-buttons">
                        <Button primary onClick={handleSave}>
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="modal-content-bottom">
                    <div className="modal-login-container">
                      <label htmlFor="password" className="modal-login-container-label">
                        New password
                      </label>
                      <input
                        type="password"
                        placeholder="********"
                        name="password"
                        value={newPassword}
                        id="password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="modal-login-container-input"
                      />
                    </div>

                    <Button tertiary disabled={newPassword.length < 6} onClick={handlePasswordUpdate}>
                      Update Password
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    </>
  );
});

export default SettingsForm;
