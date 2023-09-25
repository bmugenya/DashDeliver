import ListingHead from "./ListingHead";
import ListingCard from "./ListingCard";
import Container from '../Container';

import Heading from "../Heading";



function FavoritesClient({
  favorites,
  currentUser
}) {



  return (
    <>
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places you favorited!"
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
        {favorites?.map((listing) => (
          <ListingCard
            currentUser={currentUser}
            key={favorites.id}
            data={favorites[0]}
          />
        ))}
      </div>
    </Container>
    </>
  )
}

export default FavoritesClient
