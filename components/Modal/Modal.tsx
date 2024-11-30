import { FORM_SUPPLIER_FIELDS, FORM_USER_FIELDS } from "@/utils/constants";
import SubmitForm from "../Forms/SubmitForm";
import Icon from "../Icons/Icon";

export default function Modal({ openModalHandle, setAlert }: any) {
  return (
    <div
      className="absolute z-10 bg-white border-green-600 top-10 border-2 rounded-xl drop-shadow-lg p-16 w-auto md:w-[655px] lg:w-[1055px]"
      id="open-modal"
    >

      <button onClick={openModalHandle}>
        <Icon name="close" className="size-8 z-10 absolute top-3 right-5 text-red-600" />
      </button>


      <div className="grid justify-center">
        <SubmitForm setAlert={setAlert} formFields={FORM_SUPPLIER_FIELDS} routeApi={'/supplier'}/>
      </div>

    </div>
  );
}
