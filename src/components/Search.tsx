import { ComponentPropsWithoutRef } from 'react';
import { FiSearch } from 'react-icons/fi';

// TODO: Make this reusable
type SearchProps = {} & ComponentPropsWithoutRef<'input'>;

const Search = ({ ...rest }: SearchProps) => {
  return (
    <div className="search">
      <input {...rest} type="text" className="search-input" />
      <div className="search-icon">
        <FiSearch className="search-icon-search" />
      </div>
    </div>
  );
};

export default Search;
