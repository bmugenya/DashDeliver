
import { TbPhotoPlus } from 'react-icons/tb'
import useImageModal from "../hooks/useImageModal";

function ImageButton({ 
  listingId,
  currentUser
}) {


  const imageModal = useImageModal();
  

  const openImageModal = () => {
    imageModal.onOpen(listingId);
  };

  return (
    <>
    <div 
  onClick={openImageModal}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
          <TbPhotoPlus
              size={50}
            />
            <div className="font-semibold text-lg">
              Click to upload
            </div>
            
          </div>
  
    </>
  )
}

export default ImageButton
