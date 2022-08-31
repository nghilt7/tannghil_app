import videoHomepage from "../../assets/video-homepage.mp4";

import "./Home.scss";

const Home = () => {
  return (
    <div className="home-container">
      <video autoPlay muted loop playsInline>
        <source src={videoHomepage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="title">There's a better way to ask</div>
        <div className="text">
          You don't want to make a boring form. And your audience won't answer
          one. Create a typeform instead—and make everyone happy.
        </div>
        <div>
          <button className="btn-start">Get started - it's free</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
