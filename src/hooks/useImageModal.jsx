import { create } from 'zustand';

const useImageModal = create((set) => ({
  isOpen: false,
  listingId: null,
  onOpen: (listingId) => set({ isOpen: true, listingId }),
  onClose: () => set({ isOpen: false, listingId: null }),
}));


export default useImageModal;