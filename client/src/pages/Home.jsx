import Partner from "../components/home/Partner";
import AgroMissionSection from "../components/home/AgroMissionSection";
import Articles from "../components/home/Articles";
import Product from "../components/home/Product";
import Success from "../components/home/Success";
import Banner from "../components/home/Banner";
import HomeVideoPart from "../components/home/HomeVideoPart";
import Event from "../components/home/Event";
import Service from "../components/home/Service";

const Home = () => {
  return (
    <>
      <Banner />

      <Service />

      <AgroMissionSection />

      <Product />
      <Success />
      <Articles />
      <HomeVideoPart />
      <Event />
      <Partner />
    </>
  );
};

export default Home;
