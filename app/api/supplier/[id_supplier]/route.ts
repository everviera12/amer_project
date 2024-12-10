import { connection } from "@/utils/database/config";
import { generateSlug } from "@/utils/generateSlug";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id_supplier: string } }
) {
  try {
    const {
      supplier_name,
      contact_phone,
      license_plate,
      material_type,
      weight_in,
      weight_out,
      description,
    } = await request.json();

    const id_supplier = params.id_supplier;

    if (!id_supplier) {
      return NextResponse.json(
        { message: "Supplier ID is required for updating" },
        { status: 400 }
      );
    }

    const slug = supplier_name ? generateSlug(supplier_name) : undefined;

    const query = `
      UPDATE supplier
      SET supplier_name = COALESCE($1, supplier_name),
          slug = COALESCE($2, slug),
          contact_phone = COALESCE($3, contact_phone),
          license_plate = COALESCE($4, license_plate),
          material_type = COALESCE($5, material_type),
          weight_in = COALESCE($6, weight_in),
          weight_out = COALESCE($7, weight_out),
          description = COALESCE($8, description)
      WHERE id_supplier = $9
      RETURNING *
    `;

    const result = await connection.query(query, [
      supplier_name || null,
      slug || null,
      contact_phone || null,
      license_plate || null,
      material_type || null,
      weight_in || null,
      weight_out || null,
      description || null,
      id_supplier,
    ]);

    const updatedSupplier = result.rows[0];

    if (!updatedSupplier) {
      return NextResponse.json(
        { message: "Supplier not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Supplier updated successfully", supplier: updatedSupplier },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error updating supplier", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id_supplier: string } }
) {
  try {
    const id_supplier = params.id_supplier;

    if (!id_supplier) {
      return NextResponse.json(
        { message: "ID is required to delete supplier" },
        { status: 400 }
      );
    }

    const query = `
      DELETE FROM supplier
      WHERE id_supplier = $1
      RETURNING *
    `;

    const result = await connection.query(query, [id_supplier]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Supplier not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Supplier deleted successfully", supplier: result.rows[0] },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error deleting supplier", error: error.message },
      { status: 500 }
    );
  }
}