"use client";

import { TableProps } from "@/typescript/interface";
import { TABLE_HEADERS } from "@/utils/constants";
import { useState, useEffect } from "react";
import InputSearch from "./InputSearch";
import ButtonSort from "./ButtonSort";

const Table = ({ suppliers }: TableProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [isSortedAscending, setIsSortedAscending] = useState(true);
  const [sortedSuppliers, setSortedSuppliers] = useState(suppliers);

  // Filter data based on search input
  const filterData = sortedSuppliers.filter(
    (supplier) =>
      supplier.supplier_name
        .toLocaleLowerCase()
        .includes(searchValue.toLocaleLowerCase()) ||
      supplier.license_plate
        .toLocaleLowerCase()
        .includes(searchValue.toLocaleLowerCase())
  );

  // Handle sorting based on supplier name
  const handleSort = () => {
    const sortedData = [...sortedSuppliers].sort((a, b) => {
      return isSortedAscending
        ? a.supplier_name.localeCompare(b.supplier_name)
        : b.supplier_name.localeCompare(a.supplier_name);
    });
    setSortedSuppliers(sortedData);
    // Update the sorting direction
    setIsSortedAscending(!isSortedAscending);
  };

  // Update suppliers when component mounts or suppliers change
  useEffect(() => {
    setSortedSuppliers(suppliers);
  }, [suppliers]);

  return (
    <div className="overflow-x-auto drop-shadow-lg rounded-lg space-y-7">
      {/* input search */}
      <InputSearch searchValue={searchValue} setSearchValue={setSearchValue} />

      <table className="w-[1500px] xl:w-[1440px] 2xl:w-[2560px] bg-white border border-gray-200 rounded-lg">
        {/* headers */}
        <thead>
          <tr className="bg-green-700 text-white text-left text-sm uppercase font-bold">
            {TABLE_HEADERS.map((header, index) => (
              <th key={index} className={`p-4 ${index === 0 ? 'rounded-l-lg' : ''} ${index === TABLE_HEADERS.length - 1 ? 'rounded-r-lg' : ''}`}>
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
          {filterData.length > 0 ? (
            filterData.map((supplier) => (
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
                <td className="p-4">
                  <button className="bg-green-600 text-white p-1.5 rounded-full hover:bg-green-700 focus:outline-none transition duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </button>
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
  );
};

export default Table;
