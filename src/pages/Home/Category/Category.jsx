import { useEffect, useState } from "react";
import CategoryItems from "./CategoryItems";

const Category = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/medicine')
      .then(res => res.json())
      .then(data => {
       
        const categoryData = data.reduce((acc, item) => {
          const found = acc.find(cat => cat.category === item.category);
          if (found) {
            found.noOfMedicines += 1;
          } else {
            acc.push({
              ...item,
              noOfMedicines: 1
            });
          }
          return acc;
        }, []);
        setMedicines(categoryData);
      });
  }, []);

  return (
    <div className="container md:grid grid-cols-3 gap-4 mt-20 mb-10 mx-auto">
      {medicines.map((item, index) => (
        <CategoryItems key={index} item={item} />
      ))}
    </div>
  );
};

export default Category;