import { motion } from 'framer-motion';
import { LoginSignupFormProps } from '../Types';
import Button from './Button';

const LoginSignupForm = ({ title, switchTitle }: LoginSignupFormProps) => {
  return (
    <motion.form
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
      <h1 className="modal-login-title">{title}</h1>
      <div className="modal-login-container">
        <label htmlFor="email" className="modal-login-container-label">
          Email
        </label>
        <input
          type="email"
          placeholder="example@example.com"
          name="email"
          id="email"
          className="modal-login-container-input"
        />
      </div>
      <div className="modal-login-container">
        <label htmlFor="password" className="modal-login-container-label">
          Password
        </label>
        <input
          type="password"
          placeholder="*******"
          name="password"
          id="password"
          className="modal-login-container-input"
        />
      </div>
      {title == 'Log in' && (
        <button type="button" className="modal-login-container-forgot">
          Forgot password?
        </button>
      )}

      <Button
        disabled
        type="submit"
        primary
        style={{
          alignSelf: 'center',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </Button>

      <div className="modal-login-container-alternative">
        <p className="modal-login-container-alternative-text">
          {title === 'Log in' ? "Don't" : 'Already'} have an account?
        </p>
        <button type="button" className="modal-login-container-alternative-button" onClick={switchTitle}>
          {title === 'Log in' ? 'Sign up' : 'Log in'}
        </button>
      </div>
    </motion.form>
  );
};

export default LoginSignupForm;
