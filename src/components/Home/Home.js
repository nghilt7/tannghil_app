import videoHomepage from "../../assets/video-homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Home.scss";

const Home = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const navigate = useNavigate();

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
          {isAuthenticated ? (
            <button className="btn-start" onClick={() => navigate("/users")}>
              Doing Quiz Now
            </button>
          ) : (
            <button className="btn-start" onClick={() => navigate("/login")}>
              Get started - it's free
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
