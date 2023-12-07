import ListingCategory from "../../components/listing/ListingCategory";
import { categories } from '../../components/navbar/Categories';
import { useNavigate } from "react-router-dom";
import ListingCard from "../../components/listing/ListingCard";
import { useDispatch, useSelector } from 'react-redux'

import Loader from "../../components/Loader"
import AssignModal from "../../components/modals/AssignModal"
import Search from "../../components/navbar/Search";
import Mark from "../../components/Mark";
import EmptyState from "../../components/EmptyState";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import useAssignModal from "../../hooks/useAssignModal"
import useRentModal from "../../hooks/useRentModal";
import { BiCalendar } from "react-icons/bi";
import { BiSolidBookContent } from "react-icons/bi";
import { BiSolidMap } from "react-icons/bi";
import Map from "../../components/Map"
import { BiSolidCar } from "react-icons/bi";
import { useState } from "react";
import { BiSolidTruck } from "react-icons/bi";
import { BiSolidBriefcase } from "react-icons/bi";
import { useParams } from "react-router-dom";
import {  useEffect } from "react";
import { getListingAsync } from "../../features/listing/listingActions";
import { BiCar } from "react-icons/bi";

function HomePage({listings ,isLoading}) {
const dispatch = useDispatch();
let { id } = useParams()
 let navigate = useNavigate();
 const { currentUser } = useSelector((state) => state.currentUser)
const [isModalOpen, setIsModalOpen] = useState(false);
 const rentModal = useRentModal();
const { listing } = useSelector((state) => state.listing)
 const [receiverCountryLabel, setReceiverCountryLabel] = useState('');
  const [senderCountyLabel, setSenderCountyLabel] = useState('');
const { drivers } = useSelector((state) => state.drivers)


  useEffect(() => {
    
    if (id) {
      dispatch(getListingAsync(id));

    }
  }, [dispatch, id]);


console.log(drivers)


  const [selectedListingId, setSelectedListingId] = useState(null);


  const handleOpenModal = (listingId) => {
     setSelectedListingId(listingId);
     setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedListingId(null);
    setIsModalOpen(false);
  };


  return (
    <>


<main className="pt-10 px-8 sm:px-16">

<section className="pt-20">

    <div 
        className="
          grid 
          grid-cols-1 
          md:grid-cols-4
        "
      >


      <div className="rounded-sm col-span-1 md:col-span-1">
  <div className="w-48">
    <Button
   onClick={() => handleOpenModal(listing.id)}
      outline
      label="Assign"
      icon={AiOutlinePlus}
    />
  </div>
  <ol className="m-8 mb-0 relative border-l border-gray-200 dark:border-gray-700">
    <li className="ml-6">
      <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"></span>
      <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900"> {listing?.sender_county },  {listing?.sender_province}</h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{listing?.created_at}</time>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{listing?.parcel}</p>
   
   
    </li>
  </ol>
  <ol className="m-8 mt-0 relative border-gray-200 dark:border-gray-700">
    <li className="ml-6">
      <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"></span>
      <h3 className="mb-1 text-lg font-semibold text-gray-900"> {listing.reciever_country},  {listing.reciever_province}</h3>
       <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{listing?.status}</p>
    </li>
  </ol>
</div>
<div className="col-span-1 md:col-span-2">
<Map
  senderLocation={`Kenya, ${listing?.sender_county ?? 'Unknown County'}, ${listing?.sender_province ?? 'Unknown Province'}`}
  receiverLocation={`Kenya, ${listing?.reciever_country ?? 'Unknown County'}, ${listing?.reciever_province ?? 'Unknown Province'}`}
  height={100}
/>
</div>
<div className="rounded-sm col-span-1 md:col-span-1">

   

  <ol className="m-8 mb-0 relative  border-gray-200 dark:border-gray-700">
     {drivers?.map((driver) => (
    <li key={driver.id} className="ml-6">
      <span className="absolute flex items-center justify-center w-6 h-6  rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 "><BiCar /></span>
      <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900"> {driver.name}</h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"> {driver.status}</time>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{driver.mobile}</p>
   
   
    </li>
       ))}
  </ol>

</div>

              
   
    


       
 </div>







 </section>

<AssignModal isOpen={isModalOpen} onClose={handleCloseModal} selectedListingId={selectedListingId} />

 </main>
    </>
  )
}

export default HomePage
