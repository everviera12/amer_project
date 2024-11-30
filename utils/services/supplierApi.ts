import { FormField } from "@/typescript/interface";

export async function getSuppliers(
  setSuppliers: React.Dispatch<React.SetStateAction<any[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/supplier`
    );
    if (!response.ok) {
      throw new Error("Error fetching suppliers");
    }
    const api_response = await response.json();
    setSuppliers(api_response.client);
  } catch (error) {
    console.error("Failed to fetch suppliers", error);
  } finally {
    setLoading(false);
  }
}

export const postSupplier = async (
  e: React.FormEvent<HTMLFormElement>,
  { formFields, formRefs, setAlert, routeApi }: any
) => {
  e.preventDefault();
  console.log("Sending form...");

  const formData: { [key: string]: any } = {};

  formFields.forEach((field: FormField) => {
    formData[field.db_field] = formRefs.current[field.db_field]?.value || "";
  });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${routeApi}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const result = await response.json();

    if (response.ok) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      console.log("new provider:", result);
      setAlert(true);
    } else {
      console.log(result.message);
      alert(result.message || "Error adding supplier");
    }
  } catch (error) {
    console.error(" Error sending data:", error);
    alert(" Error sending data");
  }
};

export const deleteSupplier = async (
  id_supplier: string,
  setAlert: React.Dispatch<
    React.SetStateAction<{ visible: boolean; message: string; type: string }>
  >,
  setSortedSuppliers: React.Dispatch<React.SetStateAction<any[]>>
) => {
  try {
    const response = await fetch(`/api/supplier/${id_supplier}`, {
      method: "DELETE",
    });
    const data = await response.json();

    if (response.ok) {
      setSortedSuppliers((prevSuppliers) =>
        prevSuppliers.filter((supplier) => supplier.id_supplier !== id_supplier)
      );
      console.log("supplier deleted:", data.supplier);
      setAlert({
        visible: true,
        message: `Proveedor ${data.supplier.supplier_name} a sido eliminado correctamente`,
        type: "delete",
      });
    } else {
      setAlert({
        visible: true,
        message: data.message || "Error al eliminar proveedor",
        type: "error",
      });
    }
  } catch (error) {
    console.error("Error deleting supplier", error);
    setAlert({
      visible: true,
      message: "Ocurrió un error al eliminar el proveedor",
      type: "error",
    });
  }
};