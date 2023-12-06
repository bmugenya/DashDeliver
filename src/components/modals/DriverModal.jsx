import axios from 'axios'
import useLoginModal from "../../hooks/useLoginModal";
import useDriverModal from "../../hooks/useDriverModal";
import { url } from "../../utils/url"

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import { useDispatch, useSelector } from 'react-redux'

import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form'

function DriverModal() {
const driverModal = useDriverModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
 const {
        register, 
        handleSubmit,  
        formState: {
          errors,
        },
     } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      user_role: 'Driver'
    },
  });

    const onSubmit = async (data) => {
    setIsLoading(true);

    axios.post(`${url}/register`, data)
    .then(() => {
      toast.success('Registered!');
      console.log(data)
      driverModal.onClose();
     
    })
    .catch((error) => {
      toast.error('error!');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const onToggle = useCallback(() => {
    driverModal.onClose();
    loginModal.onOpen();
  }, [driverModal, loginModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">

        <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />


          <Input
        id="mobile"
        label="Phone No"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

  <input
    type="hidden"
    id="user_role"
    value="Driver"
   
  />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        label="Temporary Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )




  return (
   
<Modal
      disabled={isLoading}
      isOpen={driverModal.isOpen}
      title="Add a new driver"
      actionLabel="Continue"
      onClose={driverModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    
    />
    
  )
}

export default DriverModal