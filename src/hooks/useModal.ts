import { useEffect, useState } from "react";

interface UseModalResult {
  isOpen: boolean;
  modalData: ModalData | null;
  openModal: (index: number) => void;
  closeModal: () => void;
  navigatePrev: () => void;
  navigateNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export interface ModalData {
  imageUrl: string;
  name: string;
}

export function useModal(dataList: ModalData[]): UseModalResult {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsOpen(false);
    setCurrentIndex(null);
  }, [dataList]);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setCurrentIndex(null);
    setIsOpen(false);
  };

  const navigatePrev = () => {
    if (currentIndex !== null && currentIndex > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex !== null ? prevIndex - 1 : null
      );
    }
  };

  const navigateNext = () => {
    if (currentIndex !== null && currentIndex < dataList.length - 1) {
      setCurrentIndex((prevIndex) =>
        prevIndex !== null ? prevIndex + 1 : null
      );
    }
  };

  const hasPrev = currentIndex !== null && currentIndex > 0;
  const hasNext = currentIndex !== null && currentIndex < dataList.length - 1;

  const modalData = currentIndex !== null ? dataList[currentIndex] : null;

  return {
    isOpen,
    modalData,
    openModal,
    closeModal,
    navigatePrev,
    navigateNext,
    hasPrev,
    hasNext,
  };
}
