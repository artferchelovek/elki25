import { useNavigate } from "react-router";
import Header from "../Header/Header";
import "./Users.css";
import { use, useEffect, useState } from "react";
import axios from "axios";
import User_Info from "./Info";

const api = "http://192.168.10.176:8000/auth/me";

const token = localStorage.getItem("token");

const header = {
  Authorization: `Bearer ${token}`,
};

export default function DF_User() {
  const [data, setData] = useState("");
  const [load, setLoad] = useState(false);

  const [events, setEvents] = useState([]);

  function GetMP(json) {
    const fetchEvents = async () => {
      const user_mp = json.registered_at;

      if (user_mp.length > 0) {
        console.log(user_mp);

        try {
          const promises = user_mp.map(async (elem) => {
            const response = await axios.get(
              `http://192.168.10.176:8000/event/get/${elem}`
            );
            return response.data;
          });

          const results = await Promise.all(promises);

          setEvents(results);
        } catch (error) {
          console.error("Ошибка при загрузке событий:", error);
        }
      }
    };

    fetchEvents();
  }

  useEffect(() => {
    async function GetInfo() {
      try {
        const response = await axios.get(api, {
          headers: header,
        });

        const json = response.data;
        console.log(json);

        setData(json);
        GetMP(json);
      } catch (e) {
        console.log(e);
      }
    }

    GetInfo();
  }, []);

  return (
    <>
      <Header></Header>
      <User_Info />

      <div id="sub-event">
        <div className="sub-title">
          <p>Запланировано</p>
          <div className="palka"></div>
        </div>
        <div className="sub-events">
          {events.map((event) => (
            <div key={event.id} className="eventik">
              <img
                src={`http://192.168.10.176:8000/files/${event.photo[0]}`}
                alt="картиночка"
                className="eventik-img"
              />

              <p className="eventik-title">{event.event_name}</p>
              <p className="eventik-shd">{event.short_description}</p>
              <div className="eventik-split">
                <p>{event.place}</p>
                <p>
                  {" "}
                  {event.event_datetime.slice(0, 10)}{" "}
                  {event.event_datetime.slice(11, 16)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export function ORG_User() {
  const navigate = useNavigate();

  const [data, setData] = useState("");
  const [load, setLoad] = useState(false);

  const [events, setEvents] = useState([]);
  function GetMP(json) {
    const fetchEvents = async () => {
      const user_mp = json.organized_events;

      if (user_mp.length > 0) {
        console.log(user_mp);

        try {
          const promises = user_mp.map(async (elem) => {
            const response = await axios.get(
              `http://192.168.10.176:8000/event/get/${elem}`
            );
            return response.data;
          });

          const results = await Promise.all(promises);

          setEvents(results);
        } catch (error) {
          console.error("Ошибка при загрузке событий:", error);
        }
      }
    };

    fetchEvents();
  }

  useEffect(() => {
    async function GetInfo() {
      try {
        const response = await axios.get(api, {
          headers: header,
        });

        const json = response.data;
        console.log(json);

        setData(json);
        GetMP(json);
      } catch (e) {
        console.log(e);
      }
    }

    GetInfo();
    setLoad(true);
  }, []);

  return (
    <>
      <Header></Header>
      <User_Info />

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
      <div id="events-form">
        {console.log(events)}

        {events.map((event) => (
          <div key={event.id} className="eventik">
            <img
              src={`http://192.168.10.176:8000/files/${event.photo[0]}`}
              alt="картиночка"
              className="eventik-img"
            />

            <p className="eventik-title">{event.event_name}</p>
            <p className="eventik-shd">{event.short_description}</p>
            <div className="eventik-split">
              <p>{event.place}</p>
              <p>
                {" "}
                {event.event_datetime.slice(0, 10)}{" "}
                {event.event_datetime.slice(11, 16)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
