CREATE TABLE supplier(
	id_supplier SERIAL PRIMARY KEY,
	supplier_name VARCHAR(255) NOT NULL,
	contact_phone VARCHAR(20) NOT NULL,
	license_plate VARCHAR(20) NOT NULL,
	slug VARCHAR(255) NOT NULL UNIQUE,
	material_type VARCHAR(100) NOT NULL,
	weight_in DECIMAL(10, 2) NOT NULL,
	weight_out DECIMAL(10, 2),
	description TEXT,
	creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)



INSERT INTO supplier (supplier_name, contact_phone, license_plate, material_type, weight_in, weight_out, description)
VALUES
  ('Acme Industries', '555-123-4567', 'XYZ1234', 'Steel', 1000.00, 950.00, 'Supplier of steel materials for construction projects'),
  ('Global Plastics Ltd.', '555-987-6543', 'PLT9876', 'Plastic', 500.00, 450.00, 'Supplier of recycled plastics for manufacturing');


select * from supplier;


SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
where table_name = 'supplier';
