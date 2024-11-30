export const TABLE_HEADERS = [
  { label: 'Nombre del proveedor', filter: true },
  { label: 'Contacto' },
  { label: 'Matricula', filter: true },
  { label: 'Tipo de material' },
  { label: 'Peso de entrada' },
  { label: 'Peso de salida' },
  { label: 'Fecha de creacion', filter: true },
  { label: 'Acciones' },
]

export const ACTIONS_TABLE = [
  {
    title: 'Ver',
    icon: 'view',
    name: 'get',
  },
  {
    title: 'Editar',
    icon: 'edit',
    name: 'put',
  },
  {
    title: 'Eliminar',
    icon: 'delete',
    name: 'delete',
  },
]

export const FORM_SUPPLIER_FIELDS = [
  {
    db_field: 'supplier_name',
    label: 'Nombre del proveedor',
    type: 'text',
    placeholder: 'Ej. Fabrica S.A. de C.V.'
  },
  {
    db_field: 'contact_phone',
    label: 'Telefono de contacto',
    type: 'text',
    placeholder: 'Ej. 555-321-123'
  },
  {
    db_field: 'license_plate',
    label: 'Matricula',
    type: 'text',
    placeholder: 'Ej. ABC123DEF'
  },
  {
    db_field: 'material_type',
    label: 'Tipo de material',
    type: 'text',
    placeholder: 'Ej. Aluminio, Cobre'
  },
  {
    db_field: 'weight_in',
    label: 'Peso de entrada',
    type: 'text',
    placeholder: 'Ej. 200kg, 100kg'
  },
  {
    db_field: 'weight_out',
    label: 'Peso de salida',
    type: 'text',
    placeholder: 'Ej. 200kg, 100kg'
  },
  {
    db_field: 'description',
    label: 'Notas',
    type: 'text-area',
    placeholder: '.....'
  },
]

export const FORM_USER_FIELDS = [
  {
    db_field: 'first_name',
    label: 'First Name',
    type: 'text',
    placeholder: 'Enter your first name'
  },
  {
    db_field: 'last_name',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Enter your last name'
  },
  {
    db_field: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email address'
  },
  {
    db_field: 'phone',
    label: 'Phone Number',
    type: 'tel',
    placeholder: 'Enter your phone number'
  },
  {
    db_field: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password'
  },
  {
    db_field: 'confirm_password',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Confirm your password'
  },
  {
    db_field: 'address',
    label: 'Address',
    type: 'text',
    placeholder: 'Enter your address'
  },
  {
    db_field: 'city',
    label: 'City',
    type: 'text',
    placeholder: 'Enter your city'
  },
  {
    db_field: 'state',
    label: 'State',
    type: 'text',
    placeholder: 'Enter your state'
  },
  {
    db_field: 'zip_code',
    label: 'Zip Code',
    type: 'text',
    placeholder: 'Enter your zip code'
  },
  {
    db_field: 'country',
    label: 'Country',
    type: 'text',
    placeholder: 'Enter your country'
  },
  {
    db_field: 'birth_date',
    label: 'Birth Date',
    type: 'date',
    placeholder: ''
  }
];
