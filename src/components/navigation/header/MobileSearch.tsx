import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MobileSearch = ({ open, handleClose }) => {
  return (
    <div className={open ? "dark:bg-dark text-center w-full top-0 fixed bg-white z-50 mt-1 pb-2 pt-2 pl-2 pr-4 flex lg:hidden" : 'hidden'}>
      <button onClick={handleClose} className="mr-2 md:mr-3 ml-0"><FontAwesomeIcon size="1x" className="dark:text-white text-gray" icon={faArrowLeft} /></button>
      <input style={{ width: '97%' }} className="dark:bg-dark2 bg-lightGray ml-0 pt-1 pb-1 pl-4 pr-4 rounded-3xl outline-none" type="search" name="search" placeholder="Search" title="search" />
      <button><FontAwesomeIcon className="dark:text-white text-black relative -left-8" icon={faSearch} size="1x" /></button>
    </div>
  )
}


export default MobileSearch;
