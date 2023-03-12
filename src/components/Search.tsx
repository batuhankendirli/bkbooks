import { ComponentPropsWithoutRef, EventHandler, useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoFilter } from 'react-icons/io5';
import { changeFindType, changeOrderBy, changePrintType, changeSearchTerm, filterResults } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { SearchProps } from '../Types';
import Button from './Button';

// TODO: Make this reusable

const Search = ({ advanced, handleSave, ...rest }: SearchProps) => {
  const filterRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { findBy, searchTerm, orderBy, printType } = useAppSelector((state) => state.homepage);

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

  const handleFindByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeFindType(e.target.value));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchTerm(e.target.value));
  };

  const handleOrderByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeOrderBy(e.target.value));
  };

  const handlePrintTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changePrintType(e.target.value));
  };

  const handleFiltering = () => {
    if (handleSave) {
      dispatch(filterResults());
      handleSave();
      setOpen(false);
    }
  };

  return (
    <div className="search">
      <input {...rest} type="text" className="search-input" value={searchTerm} onChange={handleSearch} />
      {advanced && (
        <select name="" id="" value={findBy} className="search-select" onChange={handleFindByChange}>
          <option value="intitle" className="search-select-option">
            In Title
          </option>
          <option value="inauthor" className="search-select-option">
            In Author
          </option>
          <option value="inpublisher" className="search-select-option">
            In Publisher
          </option>
          <option value="subject" className="search-select-option">
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
                <select
                  name=""
                  id="sort-by"
                  value={orderBy}
                  onChange={handleOrderByChange}
                  className="filters-container-select"
                >
                  <option value="relevance">Relevance</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
              <div className="filters-container">
                <label htmlFor="print-type" className="filters-container-label">
                  Print type
                </label>
                <select
                  name=""
                  id="print-type"
                  value={printType}
                  onChange={handlePrintTypeChange}
                  className="filters-container-select"
                >
                  <option value="all">All</option>
                  <option value="books">Books</option>
                  <option value="magazines">Magazines</option>
                </select>
              </div>
              <hr color="#e5e5e5" />
              <Button primary rounded onClick={handleFiltering}>
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
