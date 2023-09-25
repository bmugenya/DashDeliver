import HeartButton from "../HeartButton";
import Button from "../Button";
import useCountries from "../../hooks/useCountries";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import Map from "../Map"



function ListingInfo({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  amenity,
  locationValue,
}) {
    const { getByValue } = useCountries();
    // const locationObject = JSON.parse(locationValue);
    console.log(locationValue)

   const coordinates =  [1, 38]
    
    

  // console.log(coordinates)


  return (
    <>
  <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div 
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
          <div>
            {guestCount} guests
          </div>
          <div>
            {roomCount} rooms
          </div>
          <div>
            {bathroomCount} bathrooms
          </div>
        </div>
      </div>
      <hr />

      {category && (
        <ListingCategory
          icon={category.icon} 
          label={category?.label}
          description={category?.description} 
        />
      )}
      <hr />
      <div className="
      text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr />
           <div
      className="
        pt-6
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
{amenity && amenity.map((item) => (
    <div key={item.label} className="col-span-1">
  <ListingCategory
    key={item.label}
    icon={item.icon} 
    label={item.label}
    description={item.description} 
  />
  </div>
))}
</div>
      <hr />
      <Map center={coordinates} />
    </div>
    </>
  )
}

export default ListingInfo
