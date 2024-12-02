import { connection } from "@/utils/database/config";
import { NextResponse } from "next/server";

// Aquí estamos tomando el parámetro de la URL `db_table`
export async function GET(request: Request) {
  try {
    // Obtenemos el parámetro db_table desde la query de la URL
    const url = new URL(request.url);
    const db_table = url.searchParams.get("table");

    if (!db_table) {
      return NextResponse.json(
        { message: "Table name is required" },
        { status: 400 }
      );
    }

    // Realizamos la consulta en la tabla dinámica
    const query = `SELECT * FROM ${db_table}`;  // Usamos el nombre de la tabla proporcionado
    const results = await connection.query(query);

    if (results.rows.length > 0) {
      return NextResponse.json({
        message: `${db_table} data`,
        client: results.rows,
      });
    } else {
      return NextResponse.json(
        { message: `No data found for ${db_table}`, client: [] },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error fetching data", error: error.message },
      { status: 500 }
    );
  }
}