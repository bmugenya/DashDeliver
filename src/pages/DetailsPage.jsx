import routeCategory from "../components/listing/ListingCategory";
import { categories } from '../components/navbar/Categories';
import { useNavigate } from "react-router-dom";
import ListingCard from "../components/listing/ListingCard";
import { useDispatch, useSelector } from 'react-redux'

import Loader from "../components/Loader"
import AssignModal from "../components/modals/AssignModal"

import Chat from "../components/Chat"
import Search from "../components/navbar/Search";
import Mark from "../components/Mark";
import EmptyState from "../components/EmptyState";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "../components/Button";
import Heading from "../components/Heading";
import useAssignModal from "../hooks/useAssignModal"
import useRentModal from "../hooks/useRentModal";
import { BiCalendar } from "react-icons/bi";
import { BiSolidBookContent } from "react-icons/bi";
import { BiSolidMap } from "react-icons/bi";
import Map from "../components/Map"
import { BiSolidCar } from "react-icons/bi";
import { useState } from "react";
import { BiSolidTruck } from "react-icons/bi";
import { BiSolidBriefcase } from "react-icons/bi";
import { useParams } from "react-router-dom";
import {  useEffect } from "react";
import { getRouteAsync } from "../features/driver/driverActions";
import { BiCar } from "react-icons/bi";

function DetailsPage({routes ,isLoading}) {
const dispatch = useDispatch();
let { id } = useParams()
 let navigate = useNavigate();
 const { currentUser } = useSelector((state) => state.currentUser)
const [isModalOpen, setIsModalOpen] = useState(false);
 const rentModal = useRentModal();
const [currentLocation, setCurrentLocation] = useState(null);
const [locationError, setLocationError] = useState(null);

 const [receiverCountryLabel, setReceiverCountryLabel] = useState('');
  const [senderCountyLabel, setSenderCountyLabel] = useState('');
const { drivers,route } = useSelector((state) => state.drivers)


  useEffect(() => {
    
    if (id) {
      dispatch(getRouteAsync(id));

    }
  }, [dispatch, id]);



console.log(route)
useEffect(() => {
  // Function to get the current location
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      (error) => {
        setLocationError(error.message);
      }
    );
  };

  // Check if geolocation is supported by the browser
  if ("geolocation" in navigator) {
    getCurrentLocation();
  } else {
    setLocationError("Geolocation is not supported by your browser");
  }
}, []);



  const [selectedrouteId, setSelectedrouteId] = useState(null);


  const handleOpenModal = (routeId) => {
     setSelectedrouteId(routeId);
     setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedrouteId(null);
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



  <ol className="m-8 mb-0 relative  border-gray-200 dark:border-gray-700">
    <li className="ml-6">
      <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"></span>
      <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
      <time className="block mr-2  leading-none ">{route?.pickup_time} Pickup</time>
     
       <p className="ml-5 text-base font-normal text-gray-500 dark:text-gray-400">{route?.status}</p>

       </h3>
            
            
   
   
    </li>
  </ol>









  <ol className="m-8 mb-0 relative ">
    <li className="ml-6">
      <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"></span>
      <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900"> {route?.shipments?.sender_location}</h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            {route?.shipments?.created_at}</time>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{route?.shipments?.parcel}</p>
   
   
    </li>
  </ol>

</div>
<div className="col-span-1 md:col-span-2">
<Map
  senderCoordinates={currentLocation}
  receiverCoordinates={route?.shipments?.sender_coordinates}
  height={100}
/>
</div>
<div className="rounded-sm col-span-1 md:col-span-1">

   <Chat currentUser={currentUser}  sender={route?.shipments?.sender_name}/>

 

</div>

              
   
    


       
 </div>







 </section>

<AssignModal isOpen={isModalOpen} onClose={handleCloseModal} selectedrouteId={selectedrouteId} />

 </main>
    </>
  )
}

export default DetailsPage
