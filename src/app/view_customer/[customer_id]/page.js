"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BiArrowBack, BiUser } from "react-icons/bi";
import axios from "axios";
import { BounceLoader } from "react-spinners";
import { MdOutlineEmail, MdOutlineLocalPhone } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import { VscFeedback } from "react-icons/vsc";
import styles from "../../../styles/viewCustomer.module.css";

export default function ViewCustomer({ params }) {
  const router = useRouter();

  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getCustomer = async () => {
      const { data } = await axios.get("/api/customer/" + params.customer_id);
      setCustomer(data.customer);
    };
    getCustomer()
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, [params.customer_id]);

  const goBack = () => {
    router.push("/");
  };

  const handleModalShow = (id) => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleDeleteCustomer = async () => {
    const res = await axios.delete("/api/customer", {
      data: { id: params.customer_id },
    });

    if (res.status === 200) {
      setShowModal(false);
      router.push("/");
    } else {
      setError(res.data.message);
      setShowModal(false);
    }
  };

  return (
    <main>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Are you sure you want to delete this customer?</h3>
            <div className={styles.actions}>
              <button className={styles.yes} onClick={handleDeleteCustomer}>
                Yes
              </button>
              <button className={styles.no} onClick={handleModalClose}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.header}>View Customer</div>

      <div className={styles.backBtn}>
        <button onClick={goBack}>
          <BiArrowBack /> Go Back
        </button>
      </div>

      {loading ? (
        <div className={styles.loader}>
          <BounceLoader color="#4d2ad7" size={100} />
        </div>
      ) : (
        <div className={styles.main}>
          <div className={styles.customer}>
            <h3>
              <BiUser /> Name : {customer.name}
            </h3>
            <h3>
              <MdOutlineEmail /> Email : {customer.email}
            </h3>
            <h3>
              <MdOutlineLocalPhone />
              Phone : {customer.phone}
            </h3>
            <h3>
              <FaRegAddressCard /> Address : {customer.address}
            </h3>
            <h3>
              <VscFeedback /> Feedback : {customer.feedback}
            </h3>

            <div className={styles.btns}>
              <button
                className={styles.editBtn}
                onClick={() => router.push(`/edit_customer/${customer._id}`)}
              >
                Edit
              </button>
              <button className={styles.deleteBtn} onClick={handleModalShow}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
