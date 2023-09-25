
import axios from "axios";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import Container from '../Container';
import { categories } from "../navbar/Categories";
import { amenities } from "../../utils/amenities"

import ListingReservation from "./ListingReservation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { url } from "../../utils/url"
import useLoginModal from "../../hooks/useLoginModal";
import { differenceInDays, eachDayOfInterval } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux'

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};


function ListingClient({listing, currentUser}) {
  const { reservations } = useSelector((state) => state.reservations)


  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState(initialDateRange);
  

  const loginModal = useLoginModal();


console.log(listing)



  const disabledDates = useMemo(() => {
    let dates = [];

    reservations?.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.start_date),
        end: new Date(reservation.end_date),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
     return categories.find((items) => 
      items.label === listing.category);
  }, [listing.category]);

const amenity = useMemo(() => {
  if (listing && listing.amenity && typeof listing.amenity === 'string') {
    const amenityArray = JSON.parse(listing.amenity);
    if (Array.isArray(amenityArray)) {
      return amenityArray.map((item) => {
        return amenities.find((amenity) => amenity.label === item);
      });
    }
  }
  return [];
}, [listing, amenities]);


  const onCreateReservation = useCallback(() => {
      if (!currentUser) {
        return loginModal.onOpen();
      }
      setIsLoading(true);

      axios.post(`${url}/reservation`, {
        total_price:totalPrice,
        start_date: dateRange.startDate,
        end_date: dateRange.endDate,
        listing_id: listing?.id,
        user_id:currentUser?.id
      })
      .then(() => {
        toast.success('Listing reserved!');
        setDateRange(initialDateRange);

      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
  },
  [
    totalPrice, 
    dateRange, 
    listing?.id,
    currentUser,
    loginModal
  ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(
        dateRange.endDate, 
        dateRange.startDate
      );
      
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);



  const images = listing.images || [];
  const imageSrcList = [listing.image_src, ...images.map(image => image.image_src)];




  return (
    <>
 <Container>
      <div 
        className="
          max-w-screen-lg 
          mx-auto
          pt-28
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing['title']}
            imageSrc={imageSrcList}
            locationValue={listing['location_value']}
            id={listing['id']}
            currentUser={currentUser}
          />
          <div 
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
           <ListingInfo
              user={listing['user']}
              category={category}
              amenity={amenity}
   
              description={listing['description']}
              roomCount={listing['room_count']}
              guestCount={listing['guest_count']}
              bathroomCount={listing['bathroom_count']}
              locationValue={listing['location_value']}
            />
            <div 
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />

            </div>
          </div>
        </div>
      </div>
    </Container>
    </>
  )
}

export default ListingClient
