import Category from "./Category/Category";
import Featured from "./Featured/Featured";
import Health from "./Health/Health";


const Home = () => {
    return (
        <div>
            <Category />
            <Featured />
            <Health />
        </div>
    );
};

export default Home;