const InputSearch = ({ searchValue, setSearchValue }: any) => {
  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search by name or license plate..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="p-3 border w-[315px] rounded-lg border-green-700 focus:outline-none focus:border-green-700 focus:border-2"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-7 text-gray-400 absolute left-[270px]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </div>
  );
};

export default InputSearch;
