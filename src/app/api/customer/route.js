import { NextResponse } from "next/server";
import dbConnect from "../../../db/connection";
import CustomerModel from "../../../db/models/customer.model";

export async function GET() {
  await dbConnect();

  const customers = await CustomerModel.find({});

  return NextResponse.json({ customers }, { status: 200 });
}

export async function POST(req) {
  await dbConnect();

  const { name, email, phone, address, feedback } = await req.json();

  if (!name || !email || !phone || !address || !feedback) {
    return NextResponse.json({ message: "Please fill all the fields" }, { status: 400 });
  }

  const customer = await CustomerModel.create({
    name,
    email,
    phone,
    address,
    feedback,
  });
  return NextResponse.json(customer, { status: 201 });
}

export async function PUT(req) {
  await dbConnect();

  const { name, email, phone, address, feedback, _id } = await req.json();

  if (!_id) {
    return NextResponse.json({ message: "Please provide an id" }, { status: 400 });
  }

  if (!name || !email || !phone || !address || !feedback) {
    return NextResponse.json({ message: "Please fill all the fields" }, { status: 400 });
  }

  const customer = await CustomerModel.findByIdAndUpdate(_id, {
    name,
    email,
    phone,
    address,
    feedback,
  });

  if (!customer) {
    return NextResponse.json({ message: "Customer not found" }, { status: 404 });
  }

  return NextResponse.json(customer, { status: 201 });
}

export async function DELETE(req) {
  await dbConnect();

  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ message: "Please provide an id" }, { status: 400 });
  }

  const customer = await CustomerModel.findByIdAndDelete(id);

  if (!customer) {
    return NextResponse.json({ message: "Customer not found" }, { status: 404 });
  }

  return NextResponse.json(customer, { status: 200 });
}