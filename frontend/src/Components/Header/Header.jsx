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
        <p className="header-name">AID events</p>

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
    </>
  );
}
