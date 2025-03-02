import axios from "axios";
import Header from "../Header/Header";
import "./Events.css";
import "./AddEvent.css";
const api = "http://192.168.10.176:8000/event/add";

const token = localStorage.getItem("token");

const header = {
  Authorization: `Bearer ${token}`,
  accept: "application/json",
};

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function Events() {
  const navigate = useNavigate();
  const [mp, setMp] = useState([]);

  useEffect(() => {
    async function getallmp() {
      const response = await axios.get(
        "http://192.168.10.176:8000/event/getAll"
      );

      const json = response.data;

      json.sort(function (a, b) {
        if (a.event_datetime > b.event_datetime) {
          return -1;
        }
        if (a.event_datetime < b.event_datetime) {
          return 1;
        } else {
          return 0;
        }
      });
      setMp(json.slice(0, 5));
    }

    getallmp();
  }, []);

  return (
    <>
      <Header></Header>
      <div id="active-event">
        <div className="event-title">
          <p>Мероприятия</p>
          <div className="palka"></div>
        </div>

        <div id="active-list">
          {mp.map((event) => (
            <div key={event.id} className="event">
              <img
                src={`http://192.168.10.176:8000/files/${event.photo[0]}`}
                alt=""
                className="event-img"
              />
              <p className="event-title"> {event.event_name} </p>
              <p className="descr">{event.short_description}</p>
              <div className="event-date">
                <p>{event.event_datetime.slice(0, 10)}</p>
                <p>{event.event_datetime.slice(11, 16)}</p>
              </div>
              <button
                onClick={() => {
                  navigate(`${event.id}`);
                }}
                value={event.id}
                className="event-open"
              >
                Подробнее
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export function AddMP() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [data, setData] = useState({
    title: "",
    descr: "",
    shdescr: "",
    place: "",
    date: "",
    time: "",
    direct: "",
    phone: "8",
    new_date: "",
  });

  function changeStep() {
    if (step == 1) {
      setStep(2);
      document.getElementById("event1").classList.add("pass");
      document.getElementById("event2").classList.remove("pass");
    } else if (step == 2) {
      setStep(3);
      document.getElementById("event2").classList.add("pass");
      document.getElementById("event3").classList.remove("pass");
    } else if (step == 3) {
      setStep(4);
      document.getElementById("event3").classList.add("pass");
      document.getElementById("event4").classList.remove("pass");
    } else if (step == 4) {
      const new_date = data.date + " " + data.time + ":00";
      const date = new Date(new_date).toISOString();
      console.log(date);
      data.new_date = date;
      CreateMP();
    }
  }

  function changeData(e) {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  }

  async function CreateMP() {
    const userData = {
      event_name: data.title,
      description: data.descr,
      short_description: data.shdescr,
      event_datetime: data.new_date,
      place: data.place,
      organizer_phone: data.phone,
      schedule: "string",
      direction: data.direct,
      organizer_vk: "string",
      organizer_tg: "string",
    };

    console.table(userData);

    try {
      const response = await axios.post(api, userData, {
        headers: header,
      });

      console.log(response.status, response.data);

      const formData = new FormData();
      const image = document.getElementById("event-img-in");
      console.log(image.files);
      console.log(image.files[0]);
      formData.append("uploaded_file", image.files[0]);

      const send = await axios.post(
        api + "Photo/?event_id=" + response.data.id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(send.data, send.status);

      navigate("/profile");
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {}, []);
  return (
    <>
      <div className="event-block">
        <p className="step">{step} этап</p>
        <div id="event1" className="event-content">
          <div className="event-img">
            <input
              onChange={(e) => {
                console.log(e.target.files);
              }}
              type="file"
              name="image"
              id="event-img-in"
            />
          </div>
          <input
            onChange={changeData}
            value={data.title}
            name="title"
            placeholder="Название"
            type="text"
          />
          <textarea
            onChange={changeData}
            value={data.shdescr}
            name="shdescr"
            placeholder="Краткое описание"
            id=""
          ></textarea>
        </div>
        <div id="event2" className="event-content pass">
          <textarea
            onChange={changeData}
            value={data.descr}
            name="descr"
            placeholder="Описание"
            id=""
          ></textarea>
          <div className="split-div">
            <input
              onChange={changeData}
              value={data.date}
              name="date"
              type="date"
            />
            <input
              onChange={changeData}
              value={data.time}
              name="time"
              type="time"
            />
          </div>
        </div>
        <div id="event3" className="event-content pass">
          <input
            onChange={changeData}
            value={data.place}
            name="place"
            placeholder="Площадка"
            type="list"
            list="place"
          />
          <datalist id="place">
            <option value="ДК Алюминщик"></option>
          </datalist>
          <input
            onChange={changeData}
            value={data.phone}
            name="phone"
            placeholder="Контактный номер"
            type="phone"
          />
          <input
            onChange={changeData}
            value={data.direct}
            name="direct"
            placeholder="Направление"
            type="text"
          />
        </div>

        <div id="event4"></div>
        <button onClick={changeStep} className="event-next">
          Далее
        </button>
      </div>
    </>
  );
}

export function CheckMP() {
  let { id } = useParams();
  const [mp, setMp] = useState([]);
  const [photo, setPhoto] = useState("#");
  const [time, setTime] = useState(["NamedNodeMap", "none"]);
  console.log(mp);

  useEffect(() => {
    async function GetoMP() {
      try {
        const response = await axios.get(
          `http://192.168.10.176:8000/event/get/${id}`
        );
        console.log(response.data);

        setMp(response.data);
        setPhoto(`http://192.168.10.176:8000/files/${response.data.photo[0]}`);
        setTime([
          response.data.event_datetime.slice(0, 10),
          response.data.event_datetime.slice(11, 16),
        ]);
      } catch (e) {
        console.log(e);
      }
    }

    GetoMP();
  }, []);

  async function Subscribe(eventid) {
    try {
      console.log(token);

      const pus = "";

      const res = await axios.post(
        `http://192.168.10.176:8000/user/subscribe?event_id=${eventid}`,
        pus,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);
      alert("Успешно!");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <Header></Header>

      <div className="event-check">
        <div className="event-img">
          <img src={photo} alt="" />
        </div>
        <div className="event-title"> {mp.event_name} </div>
        <div className="event-shtdes">
          <p>{mp.short_description}</p>
          <div className="event-split">
            <p>{time[0]}</p>
            <p>{time[1]}</p>
          </div>
        </div>
        <div className="event-des"> {mp.description} </div>
      </div>

      <div className="event-subscr">
        <button
          onClick={() => {
            Subscribe(mp.id);
          }}
          className="event-subscr-btn"
        >
          Я приду!
        </button>
      </div>
    </>
  );
}
