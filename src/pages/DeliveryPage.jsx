import {  useCallback, useState,useEffect } from "react";
import FavoriteClient from "../components/listing/FavoritesClient";
import { useDispatch, useSelector } from 'react-redux'
import { getDeliveryAsync } from "../features/driver/driverActions";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import { AiOutlinePlus } from "react-icons/ai";
import useDriverModal from "../hooks/useDriverModal";
import { BiCar } from "react-icons/bi";
import ReactPaginate from 'react-paginate';
import { url } from "../utils/url"
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function DeliveryPage() {

const dispatch = useDispatch();

const { currentUser } = useSelector((state) => state.currentUser)
 const driverModal = useDriverModal();
 const { delivery } = useSelector((state) => state.delivery)

let navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Set the number of items per page

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Assuming `parcel` is an array of all your data
  const slicedParcel = delivery?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);


const sliced = [];
  useEffect(() => {
    
    if (currentUser?.id) {

      dispatch(getDeliveryAsync(currentUser?.id))
    }
  }, [dispatch, currentUser]);

console.log(delivery)



const acceptSubmit = async (driverId, status) => {



    try {
      // Send a POST request to your Flask route with the selected driver's ID and status
      await axios.post(`${url}/delivery/status`, { driverId, status });

      // Assuming a successful response, you can handle further actions (e.g., displaying a success message)
      toast.success(`Delivery ${status === 'accepted' ? 'accepted' : 'declined'} successfully`);
      dispatch(getDeliveryAsync(currentUser?.id))
    } catch (error) {
     
      toast.error(error?.response?.data?.error);
    }
  };

  const handleAccept = (driverId) => {
    // Call acceptSubmit with the appropriate status (e.g., 'accepted')
    acceptSubmit(driverId, 'accepted');
  };

  const handleDecline = (driverId) => {
    // Call acceptSubmit with the appropriate status (e.g., 'declined')
    acceptSubmit(driverId, 'declined');
  };


  const navigateToViewPage = (id) => {
    // Assuming you have a route like "/details/:id"
    navigate(`/details/${id}`);
  };


  if (delivery?.length === 0) {
    return (
        <>
        <EmptyState
          title="All clear"
          subtitle="Looks like you have no task(s)."
         
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





<div className="bg-white mt-4 shadow-md rounded-lg overflow-hidden">

<div className="relative overflow-x-auto">


    <table className="w-full text-sm text-left   dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
                <th scope="col" className="px-6 py-3">
                   Name
                     </th>
                <th scope="col" className="px-6 py-3">
                    From
                </th>
                <th scope="col" className="px-6 py-3">
                   To
                </th>
                <th scope="col" className="px-6 py-3">
                  Vehicle
                </th>

                    <th scope="col" className="px-6 py-3">
                   Status
                </th>

                  
                    <th scope="col" className="px-6 py-3">
                   Action
                </th>

            </tr>
        </thead>
        <tbody>
    {slicedParcel?.map((row) => (
            <tr key={row.id} className="bg-white border-b ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {row.parcel}
                </th>
                <td className="px-6 py-4">
                      {row.reciever_location}
                </td>
                <td className="px-6 py-4">
                  {row.sender_location}
                </td>
                <td className="px-6 py-4">
                    <BiCar />
                </td>
                      <td className="px-6 py-4">
                   {row.status}
                </td>
       

                 <td className="px-6 py-4">
                      <div className="flex flex-col gap-2 p-6">
                <div 
                  className="
                    flex 
                    flex-row 
                    items-center 
                    gap-4 
                    w-full
                  "
                >
               
            {row.status === 'accepted' ? (
        // Render a different button for 'accept' status
        <Button
          label="View Details"
          onClick={() => navigateToViewPage(row.id)}
        />
      ) : (
        // Render the 'Accept' and 'Decline' buttons for other statuses
        <>
          <Button
            label="Accept"
            onClick={() => handleAccept(row.id)}
          />
          <Button
            label="Decline"
            onClick={() => handleDecline(row.id)}
          />
        </>
      )}
                </div>
           
              </div>


                </td>
                

               
            </tr>
           


     ))}


        </tbody>
    </table>

         <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={Math.ceil(delivery?.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
</div>

</div>






 </main>
    </>
  )
}

export default DeliveryPage




