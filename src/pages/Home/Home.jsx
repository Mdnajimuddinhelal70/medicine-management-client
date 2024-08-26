import HomePageSlider from "../../components/HomePageSlider/HomePageSlider";
import Category from "./Category/Category";
import Featured from "./Featured/Featured";
import Health from "./Health/Health";


const Home = () => {
    return (
        <div>
            <HomePageSlider />
            <Category />
            <Featured />
            <Health />
        </div>
    );
};

export default Home;