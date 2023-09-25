
import axios from "axios";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import ListingCard from "./ListingCard";
import Container from '../Container';
import { categories } from "../navbar/Categories";
import ListingReservation from "./ListingReservation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { url } from "../../utils/url"
import useLoginModal from "../../hooks/useLoginModal";
import { differenceInDays, eachDayOfInterval } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux'

import Heading from "../Heading";


function TripsClient({
 
  currentUser
}) {
  const { trips } = useSelector((state) => state.trips)
  console.log(trips)

 const [deletingId, setDeletingId] = useState('');
  
  const onCancel = useCallback((id) => {

      toast.success('Reservation cancelled');
   
    })



  return (
    <>
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div 
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {trips.map((trip) => (
          <ListingCard
            key={trip.id}
            data={trip?.listing}
            reservation={trip}
            actionId={trip.id}
            onAction={onCancel}
            disabled={deletingId === trip.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
    </>
  )
}

export default TripsClient
