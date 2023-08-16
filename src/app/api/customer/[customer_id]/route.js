import { NextResponse } from "next/server";
import dbConnect from "../../../../db/connection";
import CustomerModel from "../../../../db/models/customer.model";

export async function GET(req, content){
    const { customer_id } = content.params;
    await dbConnect();

    const customer = await CustomerModel.findById(customer_id);

    if(!customer){
        return NextResponse.json({ message: "Customer not found" }, { status: 404 });
    }

    return NextResponse.json({ customer }, { status: 200 });
}