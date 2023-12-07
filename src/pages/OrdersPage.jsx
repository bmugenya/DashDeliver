import { useEffect } from "react";
import FavoriteClient from "../components/listing/FavoritesClient";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import EmptyState from "../components/EmptyState";
import useLoginModal from "../hooks/useLoginModal";
import useRentModal from "../hooks/useRentModal";
import { useCallback, useState } from "react";


function OrdersPage({parcel}) {

const dispatch = useDispatch();
 const navigate = useNavigate();
const { currentUser } = useSelector((state) => state.currentUser)


  const rentModal = useRentModal();




  const handleRowClick = (id) => {
    // Assuming you have a route like "/details/:id"
    navigate(`/dispatch/${id}`);
  };



  if (parcel?.length === 0) {
    return (
        <EmptyState
          title="No Orders found"
          subtitle="Looks like you have no orders yet."
          label="New Order"
          onClick={rentModal.onOpen}
        />
    );
  }


  return (
    <>
<div className="relative h-[20px]">


 
</div>



<main className="max-w-7xl mx-auto px-8 s m:px-16">


<h2 className="text-4xl font-semibold pb-5">Product and Service</h2>



<div class="bg-white shadow-md rounded-lg overflow-hidden">

<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left  dark:text-gray-400">
       <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Order Number
                </th>
                <th scope="col" class="px-6 py-3">
                    Parcel 
                </th>
                <th scope="col" class="px-6 py-3">
                     Status
                </th>
         
                    <th scope="col" class="px-6 py-3">
                   Receiver Name
                </th>
                    <th scope="col" class="px-6 py-3">
                  Receiver Contact Number
                </th>


                    <th scope="col" class="px-6 py-3">
                    Receiver Country
                </th>

                
                

                     <th scope="col" class="px-6 py-3">
                   Sender Name
                </th>


                    <th scope="col" class="px-6 py-3">
                   Sender Contact Number
                </th>

                    <th scope="col" class="px-6 py-3">
                   Sender Country
                </th>



                    <th scope="col" class="px-6 py-3">
                 Order Date
                </th>
                    <th scope="col" class="px-6 py-3">
                 Operation
                </th>
            </tr>
        </thead>
       <tbody>

    {parcel?.map((row) => (
      <tr class="bg-white border-b "
                  onClick={() => handleRowClick(row.id)}
            style={{ cursor: 'pointer' }}>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                     KE020012488668
                </th>
                <td class="px-6 py-4">
                      {row.parcel}
                </td>
                <td class="px-6 py-4">
                   To be Picked-up
                </td>

                       <td class="px-6 py-4">
                      {row.reciever_name}
    

                </td>
                    <td class="px-6 py-4">
                    {row.reciever_contact}
                </td>
             
                      <td class="px-6 py-4">
                    {row.reciever_country },  {row.reciever_province}
                </td>

                           <td class="px-6 py-4">
                     {row.sender_name}
    

                </td>
                <td class="px-6 py-4">
                 {row.sender_contact}
                </td>
         

            <td class="px-6 py-4">
                    {row.sender_county},  {row.sender_province}
                </td>
            
           
                <td class="px-6 py-4">
                    {row.created_at}
                </td>
                 <td class="px-6 py-4">
                     settings
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

export default OrdersPage
