import PropertiesClient from "../components/listing/PropertiesClient";
import { useSelector } from 'react-redux'
import EmptyState from "../components/EmptyState";


function ABoutPage() {



  return (
    <>
  <div className='w-full inline-block'>
        <article className='flex flex-col items-start justify-end mx-5 sm:mx-10 relative h-[60vh] sm:h-[85vh]'>
            <div className='absolute top-0 left-0 bottom-0 right-0 h-full
            bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-3xl z-0
            ' />
          <img
          src='/images/question.jpg'
        placeholder='blur'

          className=" object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition"
        sizes='85vw'
       
        />

 
    </article>

    <section className="w-full  sm:mt-24  md:mt-32 px-5 sm:px-10 md:px-24  sxl:px-32 flex flex-col items-center justify-center">
  

    <div className="grid grid-cols-2 grid-rows-2 gap-6  ">
      <article className=" col-span-2  sxl:col-span-1 row-span-2 relative">
      Your Trusted Partner for Efficient Errand Services in Kenya

In a world where time is of the essence and convenience is paramount, Dash Delivery emerges as a beacon of efficiency in the bustling streets of Kenya. With a mission to make your life easier and your errands hassle-free, Dash Delivery is poised to become your trusted partner for all your errand needs.

  <h4 className="w-full mt-5 inline-block font-bold ">The Dash Delivery Difference</h4>
Dash Delivery isn't just another delivery service; it's a lifestyle enhancement. We understand that your time is precious, and mundane errands can consume hours of your day. That's where we come in. Here's why Dash Delivery stands out:


  <h4 className="w-full mt-5  inline-block font-bold">1. Swift and Reliable</h4>
When you choose Dash Delivery, you're choosing speed and reliability. Our team of dedicated runners and drivers is strategically positioned to swiftly tackle your errands. Whether it's picking up groceries, delivering important documents, or collecting your dry cleaning, we're always on the move to ensure your tasks are completed promptly.


  <h3 className="w-full mt-5  inline-block font-bold ">2. Personalized Service</h3>
We believe in personalized service tailored to your unique needs. No errand is too big or small for Dash Delivery. Our user-friendly platform allows you to specify your requirements, and we'll take care of the rest. We treat every errand as if it were our own, ensuring attention to detail and top-notch service.


  <h4 className="w-full mt-5  inline-block font-bold">3. Coverage Across Kenya</h4>
Dash Delivery is proud to offer its services across Kenya. Whether you're in Nairobi, Mombasa, Kisumu, or any other major city, we've got you covered. Our extensive network ensures that you can rely on us wherever you are in the country.


  <h4 className="w-full mt-5  inline-block font-bold">4. Secure and Efficient</h4>
Your security and the safety of your items are our top priorities. We employ state-of-the-art security measures to ensure the safe handling and transportation of your goods. Our commitment to efficiency means that you can track the progress of your errand in real-time, giving you peace of mind.


  <h4 className="w-full mt-5  inline-block font-bold ">5. Environmentally Conscious</h4>
Dash Delivery is committed to minimizing its environmental footprint. We optimize our routes and use eco-friendly vehicles to reduce emissions. By choosing us, you're not only saving time but also contributing to a cleaner, greener Kenya.


 <h4 className="w-full mt-5  inline-block font-bold "> How Dash Delivery Works</h4>

Getting started with Dash Delivery is a breeze:

<ul className="text-sm font-medium">
    <li className="w-full px-4 py-2 rounded-t-lg ">1. Create an Account: Sign up on our user-friendly platform or download our mobile app.</li>
    <li className="w-full px-4 py-2 ">2. Place Your Order Tell us what you need, where it needs to go, and when you need it there.</li>
    <li className="w-full px-4 py-2 ">3. Track Your Errand Keep an eye on the progress of your errand in real-time.</li>
    <li className="w-full px-4 py-2 rounded-b-lg">4. Delivery Relax as our reliable team takes care of your errand promptly.</li>
     <li className="w-full px-4 py-2 rounded-b-lg">5. Payment Conveniently pay for our services through our secure payment options.</li>
</ul>




 <h4 className="w-full mt-5  inline-block font-bold "> Your Time, Our Priority</h4>

At Dash Delivery, we understand that time is a finite resource. We're here to give you back the hours you'd rather not spend on errands. Let us take care of the logistics while you focus on what matters most to you.

Are you ready to experience the convenience of Dash Delivery? Join us on this exciting journey and discover a new level of efficiency in your daily life.

Dash Delivery: Your Trusted Partner for Efficient Errand Services in Kenya.
      </article>
      <article className=" col-span-2 sm:col-span-1 row-span-1 relative">
                





      </article>

    </div>
  </section>


    </div>
    </>
  )
}

export default ABoutPage
