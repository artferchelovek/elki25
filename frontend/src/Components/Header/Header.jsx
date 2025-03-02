import { useNavigate } from "react-router";
import "./Header.css";
import { useEffect, useState } from "react";

export default function Header() {
  const name = localStorage.getItem("name");
  const [enter, setEnter] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setEnter(true);
    }
  }, []);

  const navigate = useNavigate();
  return (
    <>
      <div id="header">
        <p className="header-name">AID.events</p>

        <nav className="header-nav">
          <p
            onClick={() => {
              navigate("/events");
            }}
            className="header-link"
          >
            Мероприятия
          </p>
          <p className="header-link">Платформы</p>
          <p className="header-link">Контакты</p>
        </nav>

        <div className="header-palka"></div>

        {enter ? (
          <div className="isEnter">
            <button
              onClick={() => {
                navigate("/profile");
              }}
              className="header-login"
            >
              {name}
            </button>
            <p
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("name");
                navigate("/");
              }}
              className="exit"
            >
              Выйти
            </p>
          </div>
        ) : (
          <button
            onClick={() => {
              navigate("/auth");
            }}
            className="header-login"
          >
            Вход
          </button>
        )}
      </div>
      <nav className="header-nav-m">
        <p
          onClick={() => {
            navigate("/events");
          }}
          className="header-link"
        >
          Мероприятия
        </p>
        <p className="header-link">Платформы</p>
        {enter ? (
          <div className="isEnter">
            <button
              onClick={() => {
                navigate("/profile");
              }}
              className="header-login"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_6_12155)">
                  <path
                    d="M12 5.9C13.16 5.9 14.1 6.84 14.1 8C14.1 9.16 13.16 10.1 12 10.1C10.84 10.1 9.9 9.16 9.9 8C9.9 6.84 10.84 5.9 12 5.9ZM12 14.9C14.97 14.9 18.1 16.36 18.1 17V18.1H5.9V17C5.9 16.36 9.03 14.9 12 14.9ZM12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4ZM12 13C9.33 13 4 14.34 4 17V20H20V17C20 14.34 14.67 13 12 13Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_6_12155">
                    <rect width="50" height="50" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
            {/* <p
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("name");
                navigate("/");
              }}
              className="exit"
            >
              Выйти
            </p> */}
          </div>
        ) : (
          <button
            onClick={() => {
              navigate("/auth");
            }}
            className="header-login"
          >
            Вход
          </button>
        )}
      </nav>
    </>
  );
}
