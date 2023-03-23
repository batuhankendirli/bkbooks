import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { ModalRefProps } from '../Types';
import Button from './Button';
import LoginSignupForm from './LoginSignupForm';
import Modal from './Modal';
import { FaUserCircle } from 'react-icons/fa';
import { IoBook, IoSettingsSharp, IoLogOut } from 'react-icons/io5';
import { logOutUser } from '../store/thunks/firebase';
import { clearSearchTerm } from '../store';
import SettingsForm from './SettingsForm';
const Navbar = () => {
  const modalRef = useRef<ModalRefProps>(null);
  const [title, setTitle] = useState('');
  const { displayName, email, photoURL, uid } = useAppSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const userPanelRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleClick = (event: Event) => {
      if (userPanelRef.current && !userPanelRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [userPanelRef]);

  const handleLogin = () => {
    setTitle('Log in');
    modalRef.current?.open();
  };

  const handleSignUp = () => {
    setTitle('Sign up');
    modalRef.current?.open();
  };

  const handleSwitch = () => {
    setTitle((prevTitle) => (prevTitle === 'Log in' ? 'Sign up' : 'Log in'));
  };

  const handleLogout = async () => {
    await logOutUser();
    setOpen(false);
  };

  return (
    <nav className="navigation">
      <Link to="/" className="navigation-logo">
        BKBooks
      </Link>
      <Link to={'/categories'} className="navigation-categories">
        Categories
      </Link>
      <div className="navigation-buttons">
        {uid ? (
          <div ref={userPanelRef}>
            {photoURL ? (
              <img
                src={photoURL}
                alt={`Profile picture of ${displayName ? displayName : email}`}
                className="navigation-buttons-img"
                onClick={() => setOpen(true)}
              />
            ) : (
              <FaUserCircle className="navigation-buttons-user" onClick={() => setOpen(true)} />
            )}
            <div className={`navigation-buttons-user-settings ${open ? 'show' : ''}`}>
              <ul className="navigation-buttons-user-settings-list">
                <Link
                  to="/my-books"
                  className="navigation-buttons-user-settings-list-item"
                  onClick={() => (setOpen(false), dispatch(clearSearchTerm()))}
                >
                  <IoBook className="navigation-buttons-user-settings-list-item-icon books" />
                  My Books
                </Link>
                <hr color="#e5e5e5" />
                <li
                  className="navigation-buttons-user-settings-list-item"
                  onClick={() => (setOpen(false), modalRef.current?.open())}
                >
                  <IoSettingsSharp className="navigation-buttons-user-settings-list-item-icon gear" />
                  Settings
                </li>
                <hr color="#e5e5e5" />
                <li className="navigation-buttons-user-settings-list-item" onClick={handleLogout}>
                  <IoLogOut className="navigation-buttons-user-settings-list-item-icon logout" /> Log out
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <Button outline onClick={handleLogin}>
              Log in
            </Button>
            <Button primary outline onClick={handleSignUp}>
              Sign up
            </Button>
          </>
        )}
      </div>
      {uid ? (
        <SettingsForm ref={modalRef} />
      ) : (
        <Modal ref={modalRef} login>
          <LoginSignupForm title={title} switchTitle={handleSwitch} handleSuccess={() => modalRef.current?.close()} />
        </Modal>
      )}
    </nav>
  );
};

export default Navbar;
