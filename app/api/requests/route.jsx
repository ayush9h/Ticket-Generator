import connectMongoDB from "@/lib/mongodb";
import requestdb from "@/models/request";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
      issuer,
      selectedShop,
      selectedApprover,
      description,
    } = await request.json();
    await connectMongoDB();
    await requestdb.create({
      issuer,
      shopname: selectedShop,
      approver: selectedApprover,
      description,
    });

    return NextResponse.json(
      {
        message: "Request added to the database",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.error("Failed to add request to the database", {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const requests = await requestdb.find();

    return NextResponse.json({ requests });
  } catch (error) {
    console.error(error);
    return NextResponse.error("Failed to fetch requests from the database", {
      status: 500,
    });
  }
}
