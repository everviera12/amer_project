import { connection } from "@/utils/database/config";
import { generateSlug } from "@/utils/generateSlug";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const query = "SELECT * FROM supplier";
    const results = await connection.query(query);

    if (results.rows.length > 0) {
      return NextResponse.json({
        message: "Supplier info",
        client: results.rows,
      });
    } else {
      return NextResponse.json(
        { message: "No supplier data found", client: [] },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error fetching supplier data", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
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

    const slug = generateSlug(supplier_name);

    if (
      !supplier_name ||
      !contact_phone ||
      !license_plate ||
      !material_type ||
      !weight_in
    ) {
      return NextResponse.json(
        {
          message: "All fields except weight_out and description are required",
        },
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO supplier (supplier_name, slug, contact_phone, license_plate, material_type, weight_in, weight_out, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
    `;

    const finalWeightOut = weight_out || null;

    const result = await connection.query(query, [
      supplier_name,
      slug,
      contact_phone,
      license_plate,
      material_type,
      weight_in,
      finalWeightOut,
      description || null,
    ]);

    const newSupplier = result.rows[0];

    return NextResponse.json(
      { message: "Supplier added successfully", supplier: newSupplier },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error adding supplier", error: error.message },
      { status: 500 }
    );
  }
}
