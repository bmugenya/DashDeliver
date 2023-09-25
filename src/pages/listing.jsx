import { useEffect } from "react";
import ListingClient from "../components/listing/ListingClient";
import { useDispatch, useSelector } from 'react-redux'
import { getListingAsync } from "../features/listing/listingActions";
import { getReservationAsync } from "../features/reservation/reservationActions";
import { useParams } from "react-router-dom";


function ListingPage() {

  let { id } = useParams()
const dispatch = useDispatch();

    const { listing } = useSelector((state) => state.listing)

 const { currentUser } = useSelector((state) => state.currentUser)

    useEffect(() => {
       
        dispatch(getListingAsync(id))
         dispatch(getReservationAsync(id))
  
    },[])

  return (
    <>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        
      />
    </>
  )
}

export default ListingPage
