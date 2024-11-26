export interface Supplier {
  id_supplier: number;
  supplier_name: string;
  contact_phone: string;
  license_plate: string;
  material_type: string;
  weight_in: number;
  weight_out: number;
  description?: string;
  creation_date: string;
}

export interface TableProps {
  suppliers: Supplier[];
}
