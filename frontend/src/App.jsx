import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";

export default function App() {
  const location = useLocation();
  const { darkMode } = useTheme();

  const authPages = ["/login", "/register"];

  const hideLayout = authPages.includes(location.pathname);

  return (
    <div
      className={`

      min-h-screen
      transition-all
      duration-300

      ${
        darkMode
          ? `
            bg-black
            text-white
          `
          : `
            bg-gray-50
            text-black
          `
      }

    `}
    >
      {/* GLOBAL BACKGROUND */}
      <div
        className="
        fixed
        inset-0
        -z-10
        overflow-hidden
        pointer-events-none
      "
      >
        {/* DARK MODE */}
        {darkMode && (
          <>
            <div
              className="
              absolute
              top-0
              left-0
              w-[500px]
              h-[500px]
              bg-purple-600/20
              blur-[140px]
              rounded-full
            "
            />

            <div
              className="
              absolute
              bottom-0
              right-0
              w-[500px]
              h-[500px]
              bg-yellow-400/10
              blur-[140px]
              rounded-full
            "
            />
          </>
        )}

        {/* LIGHT MODE */}
        {!darkMode && (
          <>
            <div
              className="
              absolute
              top-0
              left-0
              w-[500px]
              h-[500px]
              bg-purple-200/40
              blur-[140px]
              rounded-full
            "
            />

            <div
              className="
              absolute
              bottom-0
              right-0
              w-[500px]
              h-[500px]
              bg-yellow-200/40
              blur-[140px]
              rounded-full
            "
            />
          </>
        )}
      </div>

      {/* NAVBAR */}
      {!hideLayout && <Navbar />}

      {/* ROUTES */}
      <main
        className="
        relative
        z-10
      "
      >
        <AppRoutes />
      </main>

      {/* FOOTER */}
      {!hideLayout && <Footer />}
    </div>
  );
}
