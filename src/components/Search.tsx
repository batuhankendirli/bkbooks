import { ComponentPropsWithoutRef, EventHandler, useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoFilter } from 'react-icons/io5';
import { SearchProps } from '../Types';
import Button from './Button';

// TODO: Make this reusable

const Search = ({ advanced, ...rest }: SearchProps) => {
  const filterRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClick = (event: Event) => {
      if (filterRef.current && !filterRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [filterRef]);

  return (
    <div className="search">
      <input {...rest} type="text" className="search-input" />
      {advanced && (
        <select name="" id="" className="search-select">
          <option value="" className="search-select-option">
            In Title
          </option>
          <option value="" className="search-select-option">
            In Author
          </option>
          <option value="" className="search-select-option">
            In Publisher
          </option>
          <option value="" className="search-select-option">
            In Subject
          </option>
        </select>
      )}
      <div className="search-icon">
        {advanced && (
          <div
            ref={filterRef}
            style={{
              display: 'flex',
              position: 'relative',
            }}
          >
            <IoFilter className="search-icon-filter" onClick={() => setOpen(true)} />
            <div className={`filters ${open ? 'show' : ''}`}>
              <div className="filters-container">
                <label htmlFor="sort-by" className="filters-container-label">
                  Sort by
                </label>
                <select name="" id="sort-by" className="filters-container-select">
                  <option value="">Relevance</option>
                  <option value="">Newest</option>
                </select>
              </div>
              <div className="filters-container">
                <label htmlFor="print-type" className="filters-container-label">
                  Print type
                </label>
                <select name="" id="print-type" className="filters-container-select">
                  <option value="">All</option>
                  <option value="">Books</option>
                  <option value="">Magazines</option>
                </select>
              </div>
              <hr color="#e5e5e5" />
              <Button primary rounded>
                Save
              </Button>
            </div>
          </div>
        )}
        <FiSearch className="search-icon-search" />
      </div>
    </div>
  );
};

export default Search;
