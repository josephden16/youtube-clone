import { IoSunnyOutline } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";

const ThemeToggle = ({ handleThemeToggle, className }) => {
  const isDarkModeEnabled = document.documentElement.classList.contains("dark");
  let currentTheme = isDarkModeEnabled ? "dark" : "light";

  if (currentTheme === "light") {
    return (
      <button
        style={{ outline: "none" }}
        className={className}
        onClick={handleThemeToggle}
      >
        <FaMoon
          style={{ fontSize: "18px", color: "black" }}
          className="mt-1 lg:mt-2"
        />
      </button>
    );
  }

  return (
    <button
      style={{ outline: "none" }}
      className={className}
      onClick={handleThemeToggle}
    >
      <IoSunnyOutline
        style={{ fontSize: "20px", color: "gold" }}
        className="mt-1 lg:mt-2"
      />
    </button>
  );
};

export default ThemeToggle;
