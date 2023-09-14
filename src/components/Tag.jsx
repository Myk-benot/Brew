import React, { useState } from "react";
import Modal from "./Modal";

export default function Tag({ brewery, onAddBrewery }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <ul class="brew-list">
      <li class="text-lg">{brewery.name}</li>
      <button
        class="bg-amber-900 text-white p-1 rounded-md"
        onClick={openModal}
      >
        More Info!
      </button>
      {isModalOpen && (
        <Modal
          onClose={closeModal}
          brewery={brewery}
          onAddBrewery={onAddBrewery}
        />
      )}
    </ul>
  );
}
