import useAssignModal from "../../hooks/useAssignModal";
import axios from 'axios'
import { url } from "../../utils/url"
import {  useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { authUserAsync } from '../../features/user/userActions'
import { useForm } from 'react-hook-form'
import { toast } from "react-hot-toast";
import { useCallback, useMemo } from "react";
import { BiCar } from "react-icons/bi";
import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

function AssignModal({isOpen, onClose,selectedListingId}) {


const { drivers } = useSelector((state) => state.drivers)
  const [open, setOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false);
  const { error } = useSelector((state) => state.user)
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const assignModal = useAssignModal();


const onSubmit = async (driverId) => {
  try {
    // Send a POST request to your Flask route with the selected driver's ID
    await axios.post(`${url}/accept_delivery/${selectedListingId}/${driverId}`);
    
    // Assuming a successful response, you can handle further actions (e.g., displaying a success message)
    toast.success('Delivery accepted successfully');
  } catch (error) {
    // Handle error, display an error message, etc.
    toast.error('Error accepting delivery');
  }
};






  const bodyContent = (
    <div className="flex flex-col gap-4">
  <table class="w-full text-sm text-left   dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
                <th scope="col" class="px-6 py-3">
                   Name
                     </th>
                <th scope="col" class="px-6 py-3">
                    # of Assign Orders
                </th>
      

                  
            </tr>
        </thead>
        <tbody>
    {drivers?.map((driver) => (
            <tr  key={driver.id} onClick={() => onSubmit(driver.id)} class="bg-white border-b ">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {driver.name}
                </th>
            
                <td class="px-6 py-4">
                    <BiCar />
             
       </td>
               
            </tr>
           


     ))}


        </tbody>
    </table>
    </div>
  )




  return (
    <>
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Assign Order"
      actionLabel="Cancel"
      onClose={onClose}
      
      body={bodyContent}

    />
    </>
  )
}

export default AssignModal
