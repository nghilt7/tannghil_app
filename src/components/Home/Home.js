import videoHomepage from "../../assets/video-homepage.mp4";

import "./Home.scss";

const Home = () => {
  return (
    <div className="home-container">
      <video autoPlay muted loop playsInline>
        <source src={videoHomepage} type="video/mp4" />
      </video>
    </div>
  );
};

export default Home;
