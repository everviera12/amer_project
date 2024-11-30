import Icon from "../Icons/Icon";

const HeroHeader = ({ openModalHandle, title, icon, button_label }: any) => {
  return (
    <>
      <h1 className="text-3xl text-green-600 font-bold mb-6">{title}</h1>

      <button
        onClick={openModalHandle}
        id="button"
        className="flex items-center py-2 px-5 gap-4"
      >
        <Icon name={icon} className="size-6" />
        {button_label}
      </button>
    </>
  );
};

export default HeroHeader;
