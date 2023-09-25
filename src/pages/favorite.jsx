import { useEffect } from "react";
import FavoriteClient from "../components/listing/FavoritesClient";
import { useDispatch, useSelector } from 'react-redux'
import { getFavoritesAsync } from "../features/favorites/favoritesActions";
import EmptyState from "../components/EmptyState";

function FavoritePage() {

const dispatch = useDispatch();
const { favorites } = useSelector((state) => state.favorites)
const { currentUser } = useSelector((state) => state.currentUser)

  useEffect(() => {
    dispatch(getFavoritesAsync(currentUser?.id))
    },[])
 


  if (favorites?.length === 0) {
    return (
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
    );
  }


  return (
    <>
      <FavoriteClient
        favorites={favorites}
        currentUser={currentUser}
        
      />
    </>
  )
}

export default FavoritePage
