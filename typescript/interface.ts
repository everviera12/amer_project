export interface Supplier {
  id_supplier: string;
  supplier_name: string;
  contact_phone: string;
  license_plate: string;
  material_type: string;
  weight_in: number;
  weight_out: number;
  description?: string;
  creation_date: string;
  slug: string,
}

export interface FormField {
  db_field: string;
  label: string;
  type: string;
  placeholder: string;
  value?: string;
}

export interface SubmitFormProps {
  setAlert: (alert: { visible: boolean; message: string; type: string }) => void;
  formFields: FormField[];
}


export interface TableProps {
  suppliers: Supplier[];
  setAlert: React.Dispatch<React.SetStateAction<{ visible: boolean; message: string; type: string }>>;
}

export interface NotificationProps {
  message: string;
  type: "delete" | "create" | "warning" | "error";
}