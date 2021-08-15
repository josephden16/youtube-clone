import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MobileSearch = ({ open, handleClose, handleSearch, handleSearchEntry }) => {
  return (
    <div className={open ? "mobile-search-animation dark:bg-dark text-center w-full -top-1 fixed bg-white z-50 mt-1 pb-2 pt-2 pl-2 pr-4 flex lg:hidden" : 'hidden'}>
      <button onClick={handleClose} className="mr-2 md:mr-3 ml-0"><FontAwesomeIcon size="1x" className="dark:text-white text-gray" icon={faArrowLeft} /></button>
      <input onChange={(evt) => handleSearchEntry(evt.target.value)} style={{ width: '100%' }} className="dark:bg-dark2 bg-lightGray ml-0 pt-1 pb-1 pl-4 pr-4 rounded-3xl outline-none" type="text" name="search" placeholder="Search" title="search" />
      <button style={{ paddingTop: '3px', paddingBottom: '6px', paddingLeft: '11px', paddingRight: '11px', left: '-34px' }} className="bg-gray dark:bg-dark shadow-md relative rounded-circle" onClick={handleSearch}>
        <FontAwesomeIcon className="text-white text-sm" icon={faSearch} />
      </button>
    </div>
  )
}


export default MobileSearch;
