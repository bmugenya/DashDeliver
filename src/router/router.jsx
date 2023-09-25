import {  useEffect } from "react";
import Navbar from  '../components/navbar/Navbar'
import Footer from  '../components/navbar/Footer'
import Categories from  '../components/navbar/Categories'
import LoginModal from  '../components/modals/LoginModal'
import RegisterModal from '../components/modals/RegisterModal';
import RentModal from '../components/modals/RentModal';
import ToasterProvider from '../providers/ToasterProvider';
import Listing from "../components/Listing";
import SearchModal from '../components/modals/SearchModal';
import ImageModal from '../components/modals/ImageModal';
import ListingPage from "../pages/listing";
import HomePage from "../pages/home";
import TrackPage from "../pages/Track";
import TripsPage from "../pages/trips";
import ParcelPage from "../pages/ParcelPage";
import FavoritePage from "../pages/favorite";
import AboutPage from "../pages/about";
import LoaderDel from "../components/LoaderDel";
import { BrowserRouter, Routes, Route,useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { getCurrentUserAsync } from '../features/user/userActions'
import useAuthListener from '../hooks/use-auth-listener'
import { getListingsAsync } from "../features/listings/listingsActions";




function Router() {

const { user } = useAuthListener()
console.log(user)

const dispatch = useDispatch();
const { listings,isLoading } = useSelector((state) => state.listings)

  useEffect(() => {
    dispatch(getListingsAsync())
    if (user?.user_id) {
      dispatch(getCurrentUserAsync(user.user_id));
    }
  }, [dispatch, user]);



  return (
    <>
       <BrowserRouter>
           <ToasterProvider />
    <LoginModal />
      <RegisterModal />
        <RentModal />
           <ImageModal />
         <SearchModal />
   <Navbar/>
   <div className="pb-20">
      <Routes>
      <Route path='/' element={<HomePage listings={listings} isLoading={isLoading}/>} />
      <Route path='/ship' element={ <Listing listings={listings} isLoading={isLoading} /> } />
       <Route path='/listing/:id' element={<ListingPage />} />
       <Route path='/trips' element={<TripsPage />} />
       <Route path='/favorites' element={<FavoritePage />} />
       <Route path='/track' element={<TrackPage />}  />
       <Route path='/loader' element={<LoaderDel />}  />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/parcel' element={<ParcelPage />} />
        </Routes>
        </div>
          <Footer/>
        </BrowserRouter>
        </>

  )
}

export default Router
