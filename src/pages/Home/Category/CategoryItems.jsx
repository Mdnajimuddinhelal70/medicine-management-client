const CategoryItems = ({ item }) => {
    const { name, image, noOfmedicine } = item;
  
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden w-72 mx-auto">
        <figure className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-32 object-cover"
          />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black via-transparent to-transparent text-white p-3">
            <h2 className="text-xl font-semibold">{name}</h2>
          </div>
        </figure>
        <div className="p-4">
          <p className="text-gray-600 text-sm">Available: {noOfmedicine}</p>
        </div>
      </div>
    );
  };
  
  export default CategoryItems;
  