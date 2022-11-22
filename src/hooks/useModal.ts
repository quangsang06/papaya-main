import { useState } from 'react';

export const useModal = (initialMode = false) => {
  const [modalOpen, setModalOpen] = useState<boolean>(initialMode);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return { modalOpen, openModal, closeModal };
};
