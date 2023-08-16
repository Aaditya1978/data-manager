"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BiUser } from "react-icons/bi";
import { MdOutlineEmail, MdOutlineLocalPhone, MdAdd } from "react-icons/md";
import axios from "axios";
import { BounceLoader } from "react-spinners";
import styles from "../styles/page.module.css";

export default function Home() {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    const getCustomers = async () => {
      const { data } = await axios.get("/api/customer");
      setCustomers(data.customers);
    };
    getCustomers()
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  const handleModalShow = (id) => {
    setShowModal(true);
    setDeleteId(id);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setDeleteId("");
  };

  const handleAddCustomer = () => {
    router.push("/add_customer");
  };

  const handleDeleteCustomer = async (id) => {
    const res = await axios.delete("/api/customer", { data: { id } });

    if (res.status === 200) {
      const newCustomers = customers.filter((customer) => customer._id !== id);
      setCustomers(newCustomers);
      setShowModal(false);
    } else {
      setError(res.data.message);
      setShowModal(false);
    }
  };

  const handleViewCustomer = (id) => {
    router.push(`/view_customer/${id}`);
  };

  return (
    <main>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Are you sure you want to delete this customer?</h3>
            <div className={styles.actions}>
              <button
                className={styles.yes}
                onClick={() => handleDeleteCustomer(deleteId)}
              >
                Yes
              </button>
              <button className={styles.no} onClick={handleModalClose}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.header}>Welcome to Data Manager</div>

      <div className={styles.addBtn}>
        <button onClick={handleAddCustomer}>
          <MdAdd className={styles.icon} /> Add Customer
        </button>
      </div>

      {loading ? (
        <div className={styles.loading}>
          <BounceLoader color="#4d2ad7" size={100} />
        </div>
      ) : (
        <div className={styles.cardList}>
          {customers.map((customer) => (
            <div className={styles.card} key={customer._id}>
              <h2>
                <BiUser className={styles.icon} /> Name - {customer.name}
              </h2>
              <h4>
                <MdOutlineEmail className={styles.icon} /> Email -{" "}
                {customer.email}
              </h4>
              <h4>
                <MdOutlineLocalPhone className={styles.icon} /> Phone no. -{" "}
                {customer.phone}
              </h4>
              <div className={styles.actions}>
                <button
                  className={styles.view}
                  onClick={() => handleViewCustomer(customer._id)}
                >
                  View
                </button>
                <button
                  className={styles.delete}
                  onClick={() => handleModalShow(customer._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
