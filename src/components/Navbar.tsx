import { Link } from 'react-router-dom';
import Button from './Button';

const Navbar = () => {
  return (
    <nav className="navigation">
      <Link to="/" className="navigation-logo">
        BKBooks
      </Link>
      <Link to={'/categories'} className="navigation-categories">
        Categories
      </Link>
      <div className="navigation-buttons">
        <Button secondary outline>
          Log in
        </Button>
        <Button primary outline>
          Sign up
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
