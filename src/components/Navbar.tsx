import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ModalRefProps } from '../Types';
import Button from './Button';
import LoginSignupForm from './LoginSignupForm';
import Modal from './Modal';

const Navbar = () => {
  const modalRef = useRef<ModalRefProps>(null);
  const [title, setTitle] = useState('');

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

  return (
    <nav className="navigation">
      <Link to="/" className="navigation-logo">
        BKBooks
      </Link>
      <Link to={'/categories'} className="navigation-categories">
        Categories
      </Link>
      <div className="navigation-buttons">
        <Button outline onClick={handleLogin}>
          Log in
        </Button>
        <Button primary outline onClick={handleSignUp}>
          Sign up
        </Button>
      </div>
      <Modal ref={modalRef} login>
        <LoginSignupForm title={title} switchTitle={handleSwitch} />
      </Modal>
    </nav>
  );
};

export default Navbar;
