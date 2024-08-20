import { Link } from "react-router-dom";
import featuredImg from "../../../assets//medi4.jpg";
import "./Featured.css";

const Featured = () => {
  return (
    <>
      <div className="flex items-center justify-center mt-20">
        <h1 className="text-center text-5xl font-bold text-green-900 w-1/2">
          Boost Your Well-Being at Good Health Chiropractic & Acupuncture
        </h1>
      </div>

      <div className="featuredItem my-12 text-white font-bold bg-fixed">
        <div className="md:flex justify-center items-center py-20 px-36">
          <div className="w-1/2">
            <img className="opacity-70" src={featuredImg} alt="" />
          </div>
          <div className="md:ml-10 w-1/2">
            <p>
              Medicine is a science and practice focused on diagnosing,
              treating, and preventing illnesses. It involves the use of drugs,
              surgery, therapy, and other methods to restore health. Modern
              medicine is based on evidence and research, offering various
              treatments for diseases. Medicines include antibiotics, vaccines,
              pain relievers,            
            </p>
           <Link to='/shopPage'>
           <button className="bg-green-900 hover:bg-green-500 mt-10 py-3 px-3 rounded-md">GO FOR SHOP</button>
           </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Featured;
