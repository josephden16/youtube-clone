import { IoSunnyOutline } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { useTheme } from "../../providers/ThemeProvider";

const ThemeToggle = ({ handleThemeToggle, className }) => {
  const { theme: currentTheme } = useTheme();

  if (currentTheme === "light") {
    return (
      <button
        style={{ outline: "none" }}
        className={className}
        onClick={handleThemeToggle}
      >
        <FaMoon style={{ fontSize: "18px", color: "black" }} className="mt-1" />
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
        className="mt-1"
      />
    </button>
  );
};

export default ThemeToggle;
