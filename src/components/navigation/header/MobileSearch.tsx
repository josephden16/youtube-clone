import { FaSearch, FaArrowLeft } from "react-icons/fa";

const MobileSearch = ({
  open,
  handleClose,
  handleSearch,
  handleSearchEntry,
  handleEnterKeyPress

}) => {
  return (
    <div
      className={
        open
          ? "mobile-search-animation dark:bg-dark text-center w-full -top-1 fixed bg-white z-50 mt-1 pb-2 pt-2 pl-4  flex lg:hidden"
          : "hidden"
      }
    >
      <button onClick={handleClose} className="mr-2 md:mr-3 ml-0">
        <FaArrowLeft
          size=""
          className="dark:text-white text-gray"
        />
      </button>
      <input
        onChange={(evt) => handleSearchEntry(evt.target.value)}
        onKeyPress={(evt) => handleEnterKeyPress(evt)}
        style={{ width: "100%" }}
        className="dark:bg-dark2 bg-lightGray ml-0 pt-1 pb-1 pl-4 pr-4 rounded-3xl outline-none"
        type="text"
        name="search"
        placeholder="Search"
        title="search"
      />
      <button
        style={{
          paddingTop: "3px",
          paddingBottom: "6px",
          paddingLeft: "11px",
          paddingRight: "11px",
          left: "-34px",
        }}
        className="bg-gray dark:bg-dark shadow-md relative rounded-circle"
        onClick={handleSearch}
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default MobileSearch;
