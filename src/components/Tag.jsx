import React, { useState, useEffect } from "react";
import Modal from "./Modal";

export default function Tag({ brewery }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    console.log(isModalOpen);
  }, [isModalOpen]);

  return (
    <ul className="brew-list" class="">
      <li class="text-lg">{brewery.name}</li>
      <button
        class="bg-amber-900 text-white p-1 rounded-md"
        onClick={openModal}
      >
        More Info!
      </button>
      {isModalOpen && <Modal onClose={closeModal} brewery={brewery} />}
    </ul>
  );
}
