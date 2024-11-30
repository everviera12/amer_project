"use client";

import Alert from "@/components/Alert";
import Icon from "@/components/Icons/Icon";
import Loader from "@/components/Loader";
import Modal from "@/components/Modal/Modal";
import Table from "@/components/Table/Table";
import HeroHeader from "@/components/UI/HeroHeader";
import { Supplier } from "@/typescript/interface";
import { getSuppliers } from "@/utils/services/supplierApi";
import { useState, useEffect } from "react";

export default function Home() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState(false);
  const [alert, setAlert] = useState<{
    visible: boolean;
    message: string;
    type: string;
  }>({
    visible: false,
    message: "",
    type: "",
  });

  const openModalHandle = (e: any) => {
    setOpenModal(!openModal);
    console.log(openModal);
  };

  useEffect(() => {
    getSuppliers(setSuppliers, setLoading);
  }, []);

  return (
    <div className="relative max-w-full p-5 space-y-7">
      <HeroHeader
        openModalHandle={openModalHandle}
        title={"Tabla de proveedores"}
        icon={"supplier"}
        button_label={"Agregar nuevo proveedor"}
      />

      {openModal && (
        <Modal openModalHandle={openModalHandle} setAlert={setAlert} />
      )}

      {loading ? (
        <Loader />
      ) : (
        <Table suppliers={suppliers} setAlert={setAlert} />
      )}

      {alert.visible && (
        <Alert message={alert.message} type={alert.type as any} />
      )}
    </div>
  );
}
