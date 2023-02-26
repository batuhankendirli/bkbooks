import { useEffect, useState } from 'react';
import Button from './Button';
import { IoIosArrowUp } from 'react-icons/io';

const GoTop = () => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const listenerFunc = () => {
      setShow(window.scrollY > 500 ? true : false);
    };
    window.addEventListener('scroll', listenerFunc);

    return () => {
      window.removeEventListener('scroll', listenerFunc);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button secondary roundedFull className={`go-top${show ? ' visible' : ''}`} onClick={handleClick}>
      <IoIosArrowUp />
    </Button>
  );
};

export default GoTop;
