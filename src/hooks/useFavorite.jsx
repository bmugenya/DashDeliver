import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import useLoginModal from "./useLoginModal";
import { url } from "../utils/url"


function useFavorite({ listingId, currentUser }) {
      const loginModal = useLoginModal();


  const hasFavorited = useMemo(() => {
    const list = currentUser?.favorite_ids || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);




   const toggleFavorite = useCallback(() => {

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {

      if (hasFavorited) {
        axios.post(`${url}/favorite/${listingId}/${currentUser?.id}`);
      }
       else {
         axios.post(`${url}/favorite/${listingId}/${currentUser?.id}`);
      }

      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong.');
    }
  }, 

  [
    currentUser, 
    hasFavorited, 
    listingId, 
    loginModal,
  ]);

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite;
