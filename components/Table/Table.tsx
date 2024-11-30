"use client";

import { TableProps } from "@/typescript/interface";
import { ACTIONS_TABLE, TABLE_HEADERS } from "@/utils/constants";
import { useState, useEffect } from "react";
import InputSearch from "./InputSearch";
import ButtonSort from "./ButtonSort";
import Icon from "../Icons/Icon";
import { deleteSupplier } from "@/utils/services/supplierApi";
import { IconoProps } from "@/typescript/type";

const Table = ({ suppliers, setAlert }: TableProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [isSortedAscending, setIsSortedAscending] = useState(true);
  const [sortedSuppliers, setSortedSuppliers] = useState(suppliers);
  const [currentPage, setCurrentPage] = useState(1);
  const suppliersPerPage = 10;

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

  return (
    <>
      {/* input search */}
      <InputSearch searchValue={searchValue} setSearchValue={setSearchValue} />

      <div className="overflow-x-auto drop-shadow-lg rounded-lg space-y-7">
        <table className="w-[1500px] xl:w-[1440px] 2xl:w-[2560px] bg-white border border-gray-200 rounded-lg">
          {/* headers */}
          <thead>
            <tr className="bg-green-700 text-white text-left text-sm uppercase font-bold">
              {TABLE_HEADERS.map((header, index) => (
                <th
                  key={index}
                  className={`p-4 ${index === 0 ? "rounded-l-lg" : ""} ${
                    index === TABLE_HEADERS.length - 1 ? "rounded-r-lg" : ""
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
          <tbody>
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
                            deleteSupplier(
                              supplier.id_supplier,
                              setAlert, 
                              setSortedSuppliers
                            );
                          } else {
                            console.log("another method");
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
            className={`px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default Table;
