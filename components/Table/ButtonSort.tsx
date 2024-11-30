import Icon from "../Icons/Icon";

const ButtonSort = ({ handleSort, header }: any) => {
  return (
    <button className="flex items-center gap-3" onClick={handleSort}>
      {header.label}
      <Icon name="sort" className="size-6"/>
    </button>
  );
};

export default ButtonSort;
