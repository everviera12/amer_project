import Table from "@/components/Table/Table";
import { Supplier } from "@/typescript/interface";

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier`);
  const api_response = await response.json();
  const suppliers: Supplier[] = api_response.client;

  return (
    <div className="relative max-w-full p-5">
      <h1 className="text-3xl text-green-600 font-bold mb-6">Tabla de Proveedores</h1>

      <Table suppliers={suppliers} />

      
    </div>
  );
}
