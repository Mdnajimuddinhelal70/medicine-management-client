import { Link } from "react-router-dom";

const CategoryItems = ({ item }) => {
  const { category, image, noOfMedicines } = item;

  return (
    <Link to={`/categoryDetails/${category}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden w-72 mx-auto">
        <figure className="relative">
          <img src={image} alt={category} className="w-full h-32 object-cover" />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black via-transparent to-transparent text-white p-3">
            <h2 className="text-xl font-semibold">{category}</h2>
          </div>
        </figure>
        <div className="p-4">
          <p className="text-gray-600 text-sm">Total Medicines: {noOfMedicines}</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryItems;
