import { PuffLoader } from "react-spinners";
import Map from "./Map"
function LoaderDel() {
 
 const waypoints = [
    { lat: -1.2921, lng: 36.8219 }, // Nairobi
    { lat: -4.0435, lng: 39.6682 }, // Mombasa
  ];
  return (
    <div className=" pt-16 mx-5 my-2 rounded-md p-6 z-50 shadow-md">
   


       <div className="bg-white pt-16 mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <div className="flex-row justify-between">
            <div>
              <span className="text-lg text-gray-400">Estimated Arrival</span>
              <span className="test-4xl font-bold">45-55 Minutes</span>
            </div>
            <img
              src='/images/giphy.webp'
              className="h-20 w-20"
            />
          </div>
         
          <span className="mt-3 text-gray-500">
            Hurray! your order at  is on the way!
          </span>
        </div>



  <Map center={waypoints[0]}  height={35} />
 
    </div>
  )
}

export default LoaderDel
