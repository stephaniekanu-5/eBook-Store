import { useState,} from "react";
import { useAuth,} from "../context/AuthContext";
import { FaEye, FaEyeSlash,} from "react-icons/fa";
import { useNavigate, Link, useLocation,} from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

const from =
  typeof location.state?.from === "string"
    ? location.state.from
    : "/";  // =========================
  // STATES
  // =========================
  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [showPassword,
    setShowPassword,
  ] = useState(false);

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // VALIDATION
  // =========================
  const validateForm = () => {
    if (
      !form.email ||
      !form.password
    ) {
      return "Please fill all fields.";
    }

    return null;
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit =
    async (e) => {
      e.preventDefault();

      setError("");

      const validationError =
        validateForm();

      if (validationError) {
        return setError(
          validationError
        );
      }

      try {
        setLoading(true);

        const result = await login(
          form.email,
          form.password
        );

        if (!result.success) {
          setError(
            result.message
          );

          return;
        }

      if (typeof from === "string") {
          navigate(from, { replace: true });
        } else {
          navigate("/", { replace: true });
        }        
      } catch (err) {
        console.error(err);

        setError(
          "Something went wrong. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-black text-white
      "
    >
      <div
        className="w-full max-w-md bg-gray-900/95 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl"
      >
        {/* HEADER */}
        <h1
          className="text-3xl font-black mb-2"
        >
          Welcome Back
        </h1>

        <p
          className="text-gray-400 mb-8"
        >
          Login to continue
        </p>

        {/* ERROR */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-400 p-3 rounded-xl mb-5"
          >
            {error}
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={
            handleSubmit
          }
          className="
            space-y-5
          "
        >
          {/* EMAIL */}
          <input
            type="email"
            autoComplete="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={
              handleChange
            }
            className="w-full bg-black/70 border border-gray-700 rounded-xl p-4 outline-none focus:border-yellow-400 transition-all"
          />

          {/* PASSWORD */}
          <div
            className="
              relative
            "
          >
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              autoComplete="current-password"
              name="password"
              placeholder="Password"
              value={
                form.password
              }
              onChange={
                handleChange
              }
              className="w-full bg-black/70 border border-gray-700 rounded-xl p-4 pr-14 outline-none focus:border-yellow-400 transition-all"
            />

            {/* TOGGLE */}
            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="
                absolute
                top-1/2
                right-4
                -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-all
              "
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full

              font-bold

              py-4
              rounded-xl

              transition-all

              ${
                loading
                  ? `
                    bg-gray-700
                    cursor-not-allowed
                  `
                  : `
                    bg-yellow-400
                    hover:bg-yellow-300
                    text-black
                  `
              }
            `}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        {/* FOOTER */}
        <p
          className="
            text-gray-400
            mt-6
            text-center
          "
        >
          Don’t have an
          account?{" "}
          <Link
            to="/register"
            className="
              text-yellow-400
              hover:text-yellow-300
              font-semibold
            "
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}