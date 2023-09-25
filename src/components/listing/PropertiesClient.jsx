
import Container from '../Container';

import Loader from "../Loader"
import Heading from "../Heading";
import ImageButton from "../ImageButton";

function PropertiesClient({
  listings,
  currentUser
}) {



  return (
    <>
<Container>
      <Heading
        title="Properties"
        subtitle="List of your properties"
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
        {!listings ? (
    <Loader />
  ) : (
    <>

  {listings?.map((listing) => (
    <div 
    key={listing.id}

      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div 
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <img
              
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={listing?.image_src}
            alt="Listing"
          />
          <div className="
            absolute
            top-3
            right-3
          ">
            <ImageButton 
              listingId={listing?.id} 
              currentUser={currentUser}
            />
          </div>
        </div>
        
      </div>
    </div>



    
        ))}
           </>
  )}
      </div>
    </Container>
    </>
  )
}

export default PropertiesClient
