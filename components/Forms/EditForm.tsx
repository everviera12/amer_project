import { SubmitFormProps } from "@/typescript/interface";
import { putSupplier } from "@/utils/services/supplierApi";
import { useRef } from "react";

export default function EditForm({ setAlert, formFields, supplierId }: SubmitFormProps & { supplierId: string }) {
  const formRefs = useRef<{
    [key: string]: HTMLInputElement | HTMLTextAreaElement | null;
  }>({});

  return (
    <form
      className="space-y-7"
      onSubmit={(e) => {
        e.preventDefault();
        // Usa `supplierId` en lugar de `id_supplier` directamente
        putSupplier(e, { formFields, formRefs, setAlert, id_supplier: supplierId });
      }}
    >
      <div className="grid gap-10 grid-cols-1 md:p-10 lg:p-0 lg:grid-cols-3 w-[355px] sm:w-[505px] md:w-[655px] lg:w-[855px]">
        {formFields.map((field, index) => (
          <div className="grid" key={index}>
            <label htmlFor={field.db_field}>{field.label}</label>

            {field.type !== "text-area" ? (
              <input
                className="p-1.5 border-green-800 border rounded outline-none focus:border-orange-500 transition-colors"
                required
                type={field.type}
                placeholder={field.placeholder}
                name={field.db_field}
                defaultValue={field.value}  // Usa defaultValue para establecer el valor predeterminado
                ref={(el) => {
                  formRefs.current[field.db_field] = el;
                }}
              />
            ) : (
              <textarea
                name={field.db_field}
                placeholder={field.placeholder}
                defaultValue={field.value}  // Usa defaultValue para establecer el valor predeterminado
                ref={(el) => {
                  formRefs.current[field.db_field] = el;
                }}
                className="p-1.5 border-green-800 border rounded outline-none focus:border-orange-500 transition-colors w-auto md:w-[555px] lg:w-[850px]"
                rows={15}
              />
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white border-green-600 border py-2 px-10 rounded-full hover:bg-white transition-colors hover:text-green-600"
      >
        Guardar Cambios
      </button>
    </form>
  );
}
