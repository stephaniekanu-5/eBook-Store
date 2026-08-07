import {useState,} from "react";
import {Link, useNavigate, useLocation,} from "react-router-dom";
import {useAuth,} from "../context/AuthContext";
import {FaEye, FaEyeSlash,} from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword,] = useState(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [success, setSuccess] = useState("");
  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;
    setForm((prev) => ({...prev, [name]: value,}));
  };

  const validateForm = () => {
    if (
      !form.name ||
      !form.email ||
      !form.password
    ) {
      return "Please fill all fields.";
    }

    if (
      form.password.length < 6
    ) {
      return "Password must be at least 6 characters.";
    }

    return null;
  };

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

        const result =
          await register(
            form.name,
            form.email,
            form.password
          );

        if (!result.success) {
          setError(
            result.message
          );

          return;
        }
      setForm({
        name: "",
        email: "",
        password: "",
      });
      setSuccess("🎉 Account created successfully!");
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1500);
      } 
      catch (err) {
        console.error(err);

        setError(
          err?.response?.data?.message ||
          err.message ||
          "Something went wrong. please try again."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-4
        bg-black
        text-white
      "
    >
      <div
        className="
          w-full
          max-w-md

          bg-gray-900/95
          backdrop-blur-xl

          border
          border-gray-800

          rounded-3xl
          p-8

          shadow-2xl
        "
      >
        {/* HEADER */}
        <h1
          className="
            text-3xl
            font-black
            mb-2
          "
        >
          Create Account
        </h1>

        <p
          className="
            text-gray-400
            mb-8
          "
        >
          Start building your
          digital library
        </p>

        {/* ERROR */}
        {error && (
          <div
            className="
              bg-red-500/20
              border
              border-red-500/30

              text-red-400

              p-3
              rounded-xl

              mb-5
            "
          >
            {error}
          </div>
        )}
        {/* SUCCESS */}
        {success && (
          <div className="bg-green-500/20 border border-green-500/30 text-green-400 p-3 rounded-xl mb-5">
            {success}
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
          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={
              handleChange
            }
            autoComplete="name"
            className="
              w-full
              bg-black/70

              border
              border-gray-700

              rounded-xl
              p-4

              outline-none

              focus:border-yellow-400
              transition-all
            "
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={
              handleChange
            }
            autoComplete="email"
            className="
              w-full
              bg-black/70

              border
              border-gray-700

              rounded-xl
              p-4

              outline-none

              focus:border-yellow-400
              transition-all
            "
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
              name="password"
              placeholder="Password"
              value={
                form.password
              }
              onChange={
                handleChange
              }
              autoComplete="new-password"
              className="
                w-full
                bg-black/70

                border
                border-gray-700

                rounded-xl
                p-4
                pr-14

                outline-none

                focus:border-yellow-400
                transition-all
              "
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
                -translate-y-1/2

                text-gray-400
                hover:text-yellow-400

                transition-all
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
            className={`w-full font-bold py-4 rounded-xl transition-all 
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
              ? "Creating Account..."
              : "Register"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="
            text-gray-400
            mt-6
            text-center
          "
        >
          Already have an
          account?{" "}
          <Link
            to="/login"
            className="
              text-yellow-400
              hover:text-yellow-300
              font-semibold
            "
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}