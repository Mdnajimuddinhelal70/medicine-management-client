
import { motion } from "framer-motion";
import fishImg from '../../assets/mBanner/fish.png'


const Banner = () => {
   return (
      <motion.div
         initial={{ opacity: 0, y: -50 }}  
         animate={{ opacity: 1, y: 0 }} 
         transition={{ duration: 1, ease: "easeOut" }} 
         className="banner"
         style={{ 
            textAlign: 'center', 
            padding: '100px 20px', 
            backgroundColor: '#f5f5f5', 
            position: 'relative', 
            overflow: 'hidden',
            height: '100vh' 
         }}
      >
         <motion.img
            src={fishImg} 
            animate={{ scale: 1.1 }} 
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }} 
            alt="banner background"
            style={{
               position: 'absolute',
               top: 0,
               left: 0,
               width: '100%',
               height: '100%',
               objectFit: 'cover',  
               zIndex: -1  
            }}
         />
         <motion.h1
            animate={{ x: [-100, 0], opacity: [0, 1] }}  
            transition={{ duration: 2 }}
            style={{ color: "#fff", fontSize: "3rem", fontWeight: "bold" }}
         >
           <span className=" text-orange-600"> Welcome to Our Medicine Management System!</span>
         </motion.h1>
      </motion.div>
   );
};

export default Banner;
