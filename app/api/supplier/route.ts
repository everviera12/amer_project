import { connection } from "@/app/database/config";
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


