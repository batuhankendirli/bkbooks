import { motion } from 'framer-motion';
import { useState } from 'react';
import { registerUser, resetPassword, signInUser } from '../store/thunks/firebase';
import { LoginSignupFormProps } from '../Types';
import Button from './Button';
import Loader from './Loader';

const LoginSignupForm = ({ title, switchTitle, handleSuccess }: LoginSignupFormProps) => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState<string>('');
  const [disabled, setDisabled] = useState(true);

  const handleChange = ({ text, type }: { text: string; type: string }) => {
    type === 'email' ? setEmail(text) : setPassword(text);
    setDisabled(!email || password.length < 5 ? true : false);
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setDisabled(true);
    setLoading(true);
    const user = title === 'Log in' ? await signInUser({ email, password }) : await registerUser({ email, password });
    setLoading(false);
    setDisabled(false);
    if (user) handleSuccess();
  };

  const handleSwitch = () => {
    switchTitle();
    setEmail('');
    setPassword('');
  };

  const handlePasswordReset = async () => {
    await resetPassword(email);
  };

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
          value={email}
          onChange={(e) => handleChange({ text: e.target.value, type: 'email' })}
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
          value={password}
          onChange={(e) => handleChange({ text: e.target.value, type: 'password' })}
        />
      </div>
      {title == 'Log in' && (
        <button type="button" className="modal-login-container-forgot" onClick={handlePasswordReset}>
          Forgot password?
        </button>
      )}

      <Button
        disabled={disabled}
        type="submit"
        primary
        style={{
          alignSelf: 'center',
          textTransform: 'uppercase',
        }}
        onClick={handleSubmit}
      >
        {loading ? <Loader /> : title}
      </Button>

      <div className="modal-login-container-alternative">
        <p className="modal-login-container-alternative-text">
          {title === 'Log in' ? "Don't" : 'Already'} have an account?
        </p>
        <button type="button" className="modal-login-container-alternative-button" onClick={handleSwitch}>
          {title === 'Log in' ? 'Sign up' : 'Log in'}
        </button>
      </div>
    </motion.form>
  );
};

export default LoginSignupForm;
