import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-6
      "
    >
      <div className="text-center">
        <h1
          className="
            text-8xl
            font-black
            mb-4
          "
        >
          404
        </h1>

        <p
          className="
            text-gray-400
            mb-8
          "
        >
          Page not found.
        </p>

        <Link
          to="/"
          className="
            bg-yellow-400
            hover:bg-yellow-300
            text-black
            px-8
            py-4
            rounded-2xl
            font-bold
          "
        >
          Back Home
        </Link>
      </div>
    </main>
  );
}
