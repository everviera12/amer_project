import { FORM_SUPPLIER_FIELDS, FORM_USER_FIELDS } from "@/utils/constants";
import SubmitForm from "../Forms/SubmitForm";
import Icon from "../Icons/Icon";

export default function Modal({ openModalHandle, setAlert }: any) {
  return (

    <div className="">
      <div
        className="bg-white border-green-600 border-2 rounded-xl drop-shadow-lg p-5 w-[355px] sm:w-auto xl:w-4/5 md:p-10 lg:p-16 "
        id="open-modal"
      >
        <button onClick={openModalHandle}>
          <Icon
            name="close"
            className="size-8 z-10 absolute top-3 right-5 text-red-600"
          />
        </button>

        <div className="grid justify-center">
          <SubmitForm setAlert={setAlert} formFields={FORM_SUPPLIER_FIELDS} />
        </div>
      </div>
    </div>


  );
}
