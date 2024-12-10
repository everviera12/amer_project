import { useState, useEffect, } from "react";
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation';
import InputSearch from "./InputSearch";
import ButtonSort from "./ButtonSort";
import Icon from "../Icons/Icon";
import { deleteSupplier } from "@/utils/services/supplierApi";
import { IconoProps } from "@/typescript/type";
import DeleteAlert from "../Alerts/ConfirmationAlert";
import EditForm from "../Forms/EditForm";
import { ACTIONS_TABLE, TABLE_HEADERS } from "@/utils/constants";
import { TableProps } from "@/typescript/interface";

const Table: React.FC<TableProps> = ({ suppliers, setAlert }) => {
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);
  const [supplierToEdit, setSupplierToEdit] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isSortedAscending, setIsSortedAscending] = useState(true);
  const [sortedSuppliers, setSortedSuppliers] = useState(suppliers);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditForm, setShowEditForm] = useState(false); // Estado para controlar la visibilidad del formulario
  const suppliersPerPage = 11;
  const router = useRouter();

  // Filtrado y paginación del listado de proveedores
  const filterData = sortedSuppliers.filter(
    (supplier) =>
      supplier.supplier_name
        .toLocaleLowerCase()
        .includes(searchValue.toLocaleLowerCase()) ||
      supplier.license_plate
        .toLocaleLowerCase()
        .includes(searchValue.toLocaleLowerCase())
  );

  const indexOfLastSupplier = currentPage * suppliersPerPage;
  const indexOfFirstSupplier = indexOfLastSupplier - suppliersPerPage;
  const currentSuppliers = filterData.slice(
    indexOfFirstSupplier,
    indexOfLastSupplier
  );

  useEffect(() => {
    const filteredSuppliers = suppliers.filter(
      (supplier) =>
        supplier.supplier_name
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        supplier.license_plate.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSortedSuppliers(filteredSuppliers);
  }, [searchValue, suppliers]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSort = () => {
    const sortedData = [...sortedSuppliers].sort((a, b) => {
      return isSortedAscending
        ? a.supplier_name.localeCompare(b.supplier_name)
        : b.supplier_name.localeCompare(a.supplier_name);
    });
    setSortedSuppliers(sortedData);
    setIsSortedAscending(!isSortedAscending);
  };

  useEffect(() => {
    setSortedSuppliers(suppliers);
  }, [suppliers]);

  const totalPages = Math.ceil(filterData.length / suppliersPerPage);

  const handleDeleteClick = (supplierId: string) => {
    setSelectedSupplier(supplierId);
    setDeleteAlert(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedSupplier) {
      await deleteSupplier(selectedSupplier, setAlert, setSortedSuppliers);
    }
    setDeleteAlert(false);
    setSelectedSupplier(null);
  };

  const handleCancelDelete = () => {
    setDeleteAlert(false);
    setSelectedSupplier(null);
  };

  const handleEditClick = (supplier: any) => {
    setSupplierToEdit(supplier);
    setShowEditForm(true); // Mostrar el formulario de edición
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false); // Cerrar el formulario de edición
    setSupplierToEdit(null);
  };

  return (
    <>
      <InputSearch searchValue={searchValue} setSearchValue={setSearchValue} />

      {/* Mostrar el formulario de edición si se ha seleccionado un proveedor */}
      {showEditForm && supplierToEdit && (
        <div className="">
          <div
            className="bg-white border-green-600 border-2 rounded-xl drop-shadow-lg p-5 w-[355px] sm:w-auto xl:w-4/5 md:p-10 lg:p-16 "
            id="open-modal"
          >
            <button onClick={handleCloseEditForm}>
              <Icon
                name="close"
                className="size-8 z-10 absolute top-3 right-5 text-red-600"
              />
            </button>

            <div className="grid justify-center">
              <EditForm
                setAlert={setAlert}
                formFields={[
                  {
                    label: "Nombre del proveedor",
                    db_field: "supplier_name",
                    type: "text",
                    placeholder: "Nombre del proveedor",
                    value: supplierToEdit.supplier_name,
                  },
                  {
                    label: "Teléfono de contacto",
                    db_field: "contact_phone",
                    type: "text",
                    placeholder: "Teléfono de contacto",
                    value: supplierToEdit.contact_phone,
                  },
                  {
                    label: "Matrícula",
                    db_field: "license_plate",
                    type: "text",
                    placeholder: "Matrícula",
                    value: supplierToEdit.license_plate,
                  },
                  {
                    label: "Tipo de material",
                    db_field: "material_type",
                    type: "text",
                    placeholder: "Tipo de material",
                    value: supplierToEdit.material_type,
                  },
                  {
                    label: "Peso de entrada",
                    db_field: "weight_in",
                    type: "text",
                    placeholder: "Peso de entrada",
                    value: supplierToEdit.weight_in,
                  },
                  {
                    label: "Peso de salida",
                    db_field: "weight_out",
                    type: "text",
                    placeholder: "Peso de salida",
                    value: supplierToEdit.weight_out,
                  },
                  {
                    label: "Descripción",
                    db_field: "description",
                    type: "text-area",
                    placeholder: "Descripción",
                    value: supplierToEdit.description,
                  },
                ]}
                supplierId={supplierToEdit.id_supplier}
              />{" "}
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto drop-shadow-lg rounded-lg space-y-7">
        <table className="w-[1500px] xl:w-[1440px] 2xl:w-[2560px] bg-white border border-gray-200 rounded-lg">
          {/* headers */}
          <thead>
            <tr className="bg-green-700 text-white text-left text-sm uppercase font-bold">
              {TABLE_HEADERS.map((header, index) => (
                <th
                  key={index}
                  className={`p-4 ${index === 0 ? "rounded-l-lg" : ""} ${index === TABLE_HEADERS.length - 1 ? "rounded-r-lg" : ""
                    }`}
                >
                  {header.filter ? (
                    <ButtonSort header={header} handleSort={handleSort} />
                  ) : (
                    <span>{header.label}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          {/* body */}
          <tbody className="bg-amer-logo bg-[45%] bg-opacity-95 bg-no-repeat">
            {currentSuppliers.length > 0 ? (
              currentSuppliers.map((supplier) => (
                <tr
                  key={supplier.id_supplier}
                  className="hover:bg-gray-100 transition-colors duration-300"
                >
                  <td className="p-4">{supplier.supplier_name}</td>
                  <td className="p-4">{supplier.contact_phone}</td>
                  <td className="p-4">{supplier.license_plate}</td>
                  <td className="p-4">{supplier.material_type}</td>
                  <td className="p-4">{supplier.weight_in}</td>
                  <td className="p-4">{supplier.weight_out}</td>
                  <td className="p-4">
                    {new Date(supplier.creation_date).toLocaleDateString()}
                  </td>
                  <td className="space-x-5 relative">
                    {ACTIONS_TABLE.map((action, index) => (
                      <button
                        key={index}
                        className={`bg-orange-500 text-white p-1.5 rounded-full hover:bg-green-700 focus:outline-none transition duration-300`}
                        title={action.title}
                        onClick={() => {
                          if (action.name === "delete") {
                            handleDeleteClick(supplier.id_supplier);
                          } else if (action.name === "put") {
                            handleEditClick(supplier); 
                          } else if (action.name === 'get') {
                            console.log("Metodo get para ver al usuario y sus detalles");
                            router.push(`/providers/${supplier.id_supplier}`); 
                          }
                        }}
                      >
                        <Icon
                          name={action.icon as IconoProps["name"]}
                          className="size-6"
                        />
                      </button>
                    ))}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={TABLE_HEADERS.length}
                  className="text-center py-6 text-gray-500"
                >
                  No results
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-center space-x-2 mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded ${currentPage === index + 1
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700"
              }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Alerta de eliminación */}
      {deleteAlert && selectedSupplier && (
        <DeleteAlert
          message={`¿Estás seguro de eliminar a ${suppliers.find(
            (supplier) => supplier.id_supplier === selectedSupplier
          )?.supplier_name
            }?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default Table;
