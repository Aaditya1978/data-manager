"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BiUser, BiArrowBack } from "react-icons/bi";
import { MdOutlineEmail, MdOutlineLocalPhone } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import { VscFeedback } from "react-icons/vsc";
import axios from "axios";
import {
  header,
  backBtn,
  formDiv,
  submitBtn,
  errorDiv,
} from "../../styles/addCustomer.module.css";

export default function AddCustomer() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    feedback: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const goBack = () => {
    router.push("/");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.feedback
    ) {
      setError("Please fill all the fields");
      setLoading(false);
      return;
    }

    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email");
      setLoading(false);
      return;
    }

    // phone validation
    if (!phoneRegex.test(form.phone)) {
      setError("Please enter a valid phone number");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/api/customer", JSON.stringify(form));
      if (res.status === 201) {
        setLoading(false);
        router.push("/");
      }
    } catch (err) {
      setError(err.response.data.message);
      setLoading(false);
    }
  };

  return (
    <main>
      <div className={header}>Add New Customer</div>

      <div className={backBtn}>
        <button onClick={goBack}>
          <BiArrowBack /> Go Back
        </button>
      </div>

      <div className={formDiv}>
        <form onSubmit={handleSubmit} method="POST">
          <label htmlFor="name">
            <BiUser /> Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">
            <MdOutlineEmail /> Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">
            <MdOutlineLocalPhone /> Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <label htmlFor="address">
            <FaRegAddressCard /> Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />

          <label htmlFor="feedback">
            <VscFeedback /> Feedback
          </label>
          <textarea
            id="feedback"
            cols={40}
            rows={6}
            name="feedback"
            value={form.feedback}
            onChange={handleChange}
            required
          ></textarea>

          <div className={submitBtn}>
            {loading ? (
              <button type="submit" disabled>
                Adding Customer...
              </button>
            ) : (
              <button type="submit">Add Customer</button>
            )}
          </div>

          {error && <div className={errorDiv}>{error}</div>}
        </form>
      </div>
    </main>
  );
}
