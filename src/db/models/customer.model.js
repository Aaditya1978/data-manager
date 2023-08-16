import mongoose from "mongoose";

const customerModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Customer || mongoose.model("Customer", customerModel);