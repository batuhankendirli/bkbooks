import { IoLogoLinkedin, IoLogoGithub, IoMail } from 'react-icons/io5';
const Footer = () => {
  return (
    <footer className="footer">
      <span>
        Developed by{' '}
        <a href="https://batuhankendirli.netlify.app/" target="_blank" className="footer-author">
          Batuhan Kendirli
        </a>
      </span>

      <div className="footer-social">
        <a href="https://www.github.com/batuhankendirli" target="_blank">
          <IoLogoGithub className="footer-social-logo" />
        </a>
        <a href="https://www.linkedin.com/in/batuhan-kendirli/" target="_blank">
          <IoLogoLinkedin className="footer-social-logo" />
        </a>

        <a href="mailto:batuhankndrl@gmail.com" target="_blank">
          <IoMail className="footer-social-logo" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
