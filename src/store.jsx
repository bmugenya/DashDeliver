import { configureStore  } from '@reduxjs/toolkit'
import  user from './features/user/userSlice'
import currentUser from './features/user/userSlice'
import shipments from './features/listings/listingsSlice'
import listing from './features/listing/listingSlice'
import reservations from './features/reservation/reservationSlice'
import trips from './features/trips/tripsSlice'
import drivers from './features/favorites/favoritesSlice'

const store = configureStore({
  reducer: {
    user,
    currentUser,
    shipments,
    listing,
    reservations,
    trips,
    drivers
  },
  devTools: process.env.NODE_ENV !== 'production',
})
export default store