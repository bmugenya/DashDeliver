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


  const rentModal = useRentModal();


  console.log(currentUser?.id)

  const { shipments,isLoading } = useSelector((state) => state.shipments)
const { drivers } = useSelector((state) => state.drivers)


  useEffect(() => {
    
    if (currentUser?.id) {
     
      dispatch(getShipmentsAsync(currentUser?.id))
     
    }
  }, [dispatch, currentUser]);



  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Set the number of items per page

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Assuming `parcel` is an array of all your data
  const slicedParcel = shipments?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);



  const handleRowClick = (id) => {
    // Assuming you have a route like "/details/:id"
    navigate(`/dispatch/${id}`);
  };



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


  return (
    <>
<div className="relative h-[20px]">


 
</div>



<main className="max-w-7xl mx-auto px-8 s m:px-16">


<h2 className="text-4xl font-semibold pb-5">Product and Service</h2>



<div className="bg-white shadow-md rounded-lg overflow-hidden">

<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left  dark:text-gray-400">
       <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Order Number
                </th>
                <th scope="col" className="px-6 py-3">
                    Parcel 
                </th>
                <th scope="col" className="px-6 py-3">
                     Status
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



                    <th scope="col" className="px-6 py-3">
                 Order Date
                </th>
                    <th scope="col" className="px-6 py-3">
                 Operation
                </th>
            </tr>
        </thead>
       <tbody>

    {slicedParcel?.map((row) => (
      <tr className="bg-white border-b "
      key={row.id}
                  onClick={() => handleRowClick(row.id)}
            style={{ cursor: 'pointer' }}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                     KE020012488668
                </th>
                <td className="px-6 py-4">
                      {row.parcel}
                </td>
                <td className="px-6 py-4">
                   To be Picked-up
                </td>

                       <td className="px-6 py-4">
                      {row.reciever_name}
    

                </td>
                    <td className="px-6 py-4">
                    {row.reciever_contact}
                </td>
             
                      <td className="px-6 py-4">
                    {row.reciever_country },  {row.reciever_province}
                </td>

                           <td className="px-6 py-4">
                     {row.sender_name}
    

                </td>
                <td className="px-6 py-4">
                 {row.sender_contact}
                </td>
         

            <td className="px-6 py-4">
                    {row.sender_county},  {row.sender_province}
                </td>
            
           
                <td className="px-6 py-4">
                    {row.created_at}
                </td>
                 <td className="px-6 py-4">


                        <BiSolidTrashAlt
          size={24}
           style={{ color: 'red' }}
      
        />
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






 </main>
    </>
  )
}

export default OrdersPage
