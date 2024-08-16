function Arrow({ left = false, onClick = () => {} }) {
  return (
    <div
      onClick={onClick}
      className={`flex justify-center items-center w-10 h-10 text-3xl rounded-full bg-white/20 shadow-md text-navigation-text cursor-pointer ${
        left
          ? "translate-x-[-25px]"
          : "translate-x-[25px]"
          }`
      }
    >
      {left ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      )}
    </div>
  );
}

export default Arrow;
