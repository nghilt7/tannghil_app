import videoHomepage from "../../assets/video-homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

import "./Home.scss";

const Home = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <div className="home-container">
      <video autoPlay muted loop playsInline>
        <source src={videoHomepage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="title">{t("homepage.title1")}</div>
        <div className="text">{t("homepage.title2")}</div>
        <div>
          {isAuthenticated ? (
            <button className="btn-start" onClick={() => navigate("/users")}>
              Doing Quiz Now
            </button>
          ) : (
            <button className="btn-start" onClick={() => navigate("/login")}>
              {t("homepage.title3.login")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
