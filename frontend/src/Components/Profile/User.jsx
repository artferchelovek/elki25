import { useNavigate } from "react-router";
import Header from "../Header/Header";
import "./Users.css";

export default function DF_User() {
  return (
    <>
      <Header></Header>
    </>
  );
}

export function ORG_User() {
  const navigate = useNavigate();

  return (
    <>
      <Header></Header>

      <div className="events-org">
        <div className="title">
          <div className="title1">
            <p>Мероприятия</p>
            <button
              onClick={() => {
                navigate("/events/add");
              }}
              className="create-event"
            >
              Создать
            </button>
          </div>
          <div className="palka"></div>
        </div>
      </div>
      <div id="events-form"></div>
    </>
  );
}
