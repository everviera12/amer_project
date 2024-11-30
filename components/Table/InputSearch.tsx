import Icon from "../Icons/Icon";

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
      <Icon
        name="loupe"
        className="size-7 text-gray-400 absolute left-[285px]"
      />
    </div>
  );
};

export default InputSearch;
