import axios from 'axios';
import useImageModal from "../../hooks/useImageModal";
import ImageUpload from '../inputs/ImageUpload';
import {  useState } from "react";
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast } from "react-hot-toast";
import { url } from "../../utils/url"
import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

function ImageModal() {

  const imageModal = useImageModal();
 const [isLoading, setIsLoading] = useState(false);
 const { currentUser } = useSelector((state) => state.currentUser)

 const { listingId } = imageModal;

 console.log(listingId)
    const onSubmit = async (data) => {

  setIsLoading(true);

    axios.post(`${url}/upload/images`, data)
    .then(() => {
      toast.success('Image Uploaded! please reresh before uploading again');

      imageModal.onClose();
    })
    .catch(() => {
      toast.error('Something went wrong.');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }



  const { 
    register, 
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset,
  } = useForm({
    defaultValues: {
      listing_id:listingId,
      image_src: '',

    }
  });
  const setCustomValue = (id, value) => {
    setValue('listing_id', listingId);
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

    const image_src = watch('image_src');

  const bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
           onChange={(value) => setCustomValue('image_src', value)}
          value={image_src}
        />
      </div>
  )



  return (
    <>
    <Modal
      disabled={isLoading}
      isOpen={imageModal.isOpen}
      title="Add Photo"
      actionLabel="Continue"
      onClose={imageModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
   
    />
    </>
  )
}

export default ImageModal
