import {  useCallback, useState,useEffect } from "react";
import FavoriteClient from "../components/listing/FavoritesClient";
import { useDispatch, useSelector } from 'react-redux'

import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import { AiOutlinePlus } from "react-icons/ai";
import useDriverModal from "../hooks/useDriverModal";
import { BiCar } from "react-icons/bi";

function DriversPage({drivers}) {

const dispatch = useDispatch();

const { currentUser } = useSelector((state) => state.currentUser)
 const driverModal = useDriverModal();
 




  if (drivers?.length === 0) {
    return (
        <>
        <EmptyState
          title="No Drivers found"
          subtitle="Looks like you have no drivers yet."
           label="New Driver"
            onClick={driverModal.onOpen}
        />

 
      </>
    );
  }


  return (
    <>
<div className="relative h-[20px]">


 
</div>



<main className="max-w-7xl mx-auto px-8 s m:px-16">


<h2 className="text-4xl font-semibold pb-5">Product and Service</h2>


  <div  className="w-48 mt-4">
       <Button
            outline
  label="New Driver"
            onClick={driverModal.onOpen}
              icon={AiOutlinePlus}
       
          />

          </div>


<div className="bg-white mt-4 shadow-md rounded-lg overflow-hidden">

<div className="relative overflow-x-auto">


    <table className="w-full text-sm text-left   dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
                <th scope="col" className="px-6 py-3">
                   Name
                     </th>
                <th scope="col" className="px-6 py-3">
                    Phone
                </th>
                <th scope="col" className="px-6 py-3">
                   Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Vehicle
                </th>

                    <th scope="col" className="px-6 py-3">
                   Status
                </th>

                  
            </tr>
        </thead>
        <tbody>
    {drivers?.map((row) => (
            <tr className="bg-white border-b ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {row.name}
                </th>
                <td className="px-6 py-4">
                      {row.mobile}
                </td>
                <td className="px-6 py-4">
                   {row.email}
                </td>
                <td className="px-6 py-4">
                    <BiCar />
                </td>
                      <td className="px-6 py-4">
                   {row.status}
                </td>
       
               
            </tr>
           


     ))}


        </tbody>
    </table>
</div>

</div>






 </main>
    </>
  )
}

export default DriversPage




