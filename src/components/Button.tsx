import className from 'classnames';
import { ButtonProps } from '../Types';

const Button = ({ children, primary, secondary, rounded, roundedFull, outline, ...rest }: ButtonProps) => {
  const classes = className(rest.className, 'button', {
    'button-primary': primary,
    'button-secondary': secondary,
    'button-rounded': rounded,
    'button-rounded-full': roundedFull,
    'button-outline-primary': outline && primary,
    'button-outline-secondary': outline && secondary,
  });
  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
};

export default Button;
