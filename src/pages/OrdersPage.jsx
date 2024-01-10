import { useEffect } from "react";
import FavoriteClient from "../components/listing/FavoritesClient";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import EmptyState from "../components/EmptyState";
import useLoginModal from "../hooks/useLoginModal";
import useRentModal from "../hooks/useRentModal";
import { useCallback, useState } from "react";
import { BiSolidTrashAlt } from "react-icons/bi";
import ReactPaginate from 'react-paginate';
import { getShipmentsAsync } from "../features/listings/listingsActions";

function OrdersPage() {






const dispatch = useDispatch();
 const navigate = useNavigate();
const { currentUser } = useSelector((state) => state.currentUser)
 const [activeTab, setActiveTab] = useState('UNASSIGNED'); // Default active tab


  const rentModal = useRentModal();


 

  const { shipments,isLoading } = useSelector((state) => state.shipments)
const { drivers } = useSelector((state) => state.drivers)


  useEffect(() => {
    
    if (currentUser?.id) {
     
      dispatch(getShipmentsAsync(currentUser?.id))
     
    }
  }, [dispatch, currentUser]);



  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Set the number of items per page
  const navigateToViewPage = (id) => {
    // Assuming you have a route like "/details/:id"
    navigate(`/track/${id}`);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Assuming `parcel` is an array of all your data



  const handleRowClick = (id) => {
    // Assuming you have a route like "/details/:id"
    navigate(`/dispatch/${id}`);
  };


  if (isLoading) {
    // Show Tailwind CSS loader while data is being fetched
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }



  if (shipments?.length === 0) {
    return (
        <EmptyState
          title="No Orders found"
          subtitle="Looks like you have no orders yet."
          label="New Order"
          onClick={rentModal.onOpen}
        />
    );
  }
  const slicedParcel = shipments ? shipments?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) : [];



  return (
    <>
<div className="relative h-[20px]">


 
</div>



<main className="max-w-7xl mx-auto px-8 s m:px-16">


<h2 className="text-4xl font-semibold pb-5">Product and Service</h2>

   <div className="flex space-x-4">
          {/* Create tabs for different shipment statuses */}
          {['UNASSIGNED', 'ASSIGNED',  'COMPLETED'].map((status) => (
            <button
              key={status}
              className={`px-4 py-2 focus:outline-none ${
                activeTab === status ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setActiveTab(status)}
            >
              {status}
            </button>
          ))}
        </div>

<div className="bg-white shadow-md rounded-lg overflow-hidden">

<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left  dark:text-gray-400">
       <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>

                <th scope="col" className="px-6 py-3">
                    Parcel 
                </th>
        
         
                    <th scope="col" className="px-6 py-3">
                   Receiver Name
                </th>
                    <th scope="col" className="px-6 py-3">
                  Receiver Contact Number
                </th>


                    <th scope="col" className="px-6 py-3">
                    Receiver Country
                </th>

                
                

                     <th scope="col" className="px-6 py-3">
                   Sender Name
                </th>


                    <th scope="col" className="px-6 py-3">
                   Sender Contact Number
                </th>

                    <th scope="col" className="px-6 py-3">
                   Sender Country
                </th>



           
            </tr>
        </thead>
       <tbody>

      {slicedParcel
    .filter((row) => row.status === activeTab)
    .map((row, index) => (
      <tr
        className="bg-white border-b"
        key={row.id}
        onClick={
        row.status === 'UNASSIGNED'
          ? () => handleRowClick(row.id)
          : row.status === 'ASSIGNED'
          ? () => navigateToViewPage(row.delivery_id)
          : null
      }
      style={{
        cursor:
          (index === 0 && row.status === 'UNASSIGNED') || (row.status === 'ASSIGNED')
            ? 'pointer'
            : 'default',
      }}
    >
    
      
                <td className="px-6 py-4">
                      {row.parcel}
                </td>
        

                       <td className="px-6 py-4">
                      {row.reciever_name}
    

                </td>
                    <td className="px-6 py-4">
                    {row.reciever_contact}
                </td>
             
                      <td className="px-6 py-4">
                    {row.reciever_location}
                </td>

                           <td className="px-6 py-4">
                     {row.sender_name}
    

                </td>
                <td className="px-6 py-4">
                 {row.sender_contact}
                </td>
         

            <td className="px-6 py-4">
                    {row.sender_location}
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
        pageCount={Math.ceil(shipments?.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
</div>

</div>


   {isLoading && (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        )} 



 </main>
    </>
  )
}

export default OrdersPage
