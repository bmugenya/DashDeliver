import { create } from 'zustand';

const useAssignModal = create((set) => ({
  isOpen: false,
  selectedListingId: null, // Add selectedListingId
  onOpen: (listingId) => set({ isOpen: true, selectedListingId: listingId }), // Pass listingId as an argument
  onClose: () => set({ isOpen: false, selectedListingId: null }) // Clear selectedListingId
}));

export default useAssignModal;
