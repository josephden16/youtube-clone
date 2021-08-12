import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ThemeToggle = ({ handleThemeToggle, className }) => {
  const isDarkModeEnabled = document.documentElement.classList.contains("dark");
  let currentTheme = isDarkModeEnabled ? 'dark' : 'light';

  if (currentTheme === 'light') {
    return (
      <button className={className} onClick={handleThemeToggle}>
        <FontAwesomeIcon style={{ fontSize: '17px', color: 'black' }} className="mt-1 lg:mt-2" icon={faMoon} />
      </button>
    )
  }

  return (
    <button className={className} onClick={handleThemeToggle}>
      <FontAwesomeIcon style={{ fontSize: '18px', color: 'gold' }} className="mt-1 lg:mt-2" icon={faSun} />
    </button>
  )
}


export default ThemeToggle;
