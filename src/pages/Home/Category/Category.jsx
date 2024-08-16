import { useEffect, useState } from "react";
import CategoryItems from "./CategoryItems";


const Category = () => {
const [medicines, setMedicines] = useState([]);

  useEffect(()=> {
    fetch('http://localhost:8000/medicines')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        setMedicines(data)
    })
  }, [])
    return (
        <div className=" container md: grid grid-cols-3 gap-4 mt-20 mb-10 mx-auto">
         {
            medicines.map(item => <CategoryItems
            key={item._id}
            item={item}
            ></CategoryItems>)
         }
        </div>
    );
};

export default Category;