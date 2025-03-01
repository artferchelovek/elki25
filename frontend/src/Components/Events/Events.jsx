import axios from "axios";
import Header from "../Header/Header";
import "./Events.css";
import "./AddEvent.css";
const api = "http://192.168.10.176:8000/event/add";

const token = localStorage.getItem("token");
console.log(token);

const header = {
  Authorization: `Bearer ${token}`,
  accept: "application/json",
  biba: "zalupa",
};

import { useEffect, useState } from "react";

export default function Events() {
  return (
    <>
      <Header></Header>
      <div id="active-event">
        <div className="event-title">
          <p>Мероприятия</p>
          <div className="palka"></div>
        </div>

        <div id="active-list">
          <div className="event">
            <img
              src="https://s.may9.ru/upload/resize_cache/iblock/c20/800_600_1/ceqs7tf35m8myz9sbhlxqtn32xzkt37p.jpg"
              alt=""
              className="event-img"
            />
            <p className="event-title">80 лет победы</p>
            <p className="descr">
              9 мая на сцене театра пройдет премьерный показ спектакля «Василий
              Теркин».
            </p>
            <div className="event-date">
              <p>12 марта 2025</p>
              <p>12:00</p>
            </div>
            <button className="event-open">Подробнее</button>
          </div>
        </div>
      </div>
    </>
  );
}

export function AddMP() {
  const [data, setData] = useState({
    title: "",
    descr: "",
    shdescr: "",
    place: "",
    date: "",
    direct: "",
    phone: "",
  });

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
      event_datetime: data.date,
      place: data.place,
      organizer_phone: data.phone,
      schedule: "string",
      direction: data.direct,
    };

    console.table(userData);

    try {
      const response = await axios.post(api, userData, {
        header: header,
      });

      console.log(response.status, response.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    async function check() {
      try {
        const response = await axios.get("http://192.168.10.176:8000/auth/me", {
          headers: header,
        });

        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    }

    check();
  }, []);
  return (
    <>
      <div className="events-block">
        <p>Создать мероприятие</p>
        <div className="event-input 1">
          <input
            onChange={changeData}
            value={data.title}
            name="title"
            placeholder="Название"
            type="text"
          />
          <input
            onChange={changeData}
            value={data.descr}
            name="descr"
            placeholder="Описание"
            type="text"
          />
          <input
            onChange={changeData}
            value={data.shdescr}
            name="shdescr"
            placeholder="Краткое описание"
            type="text"
          />
        </div>
        <div className="event-input 2">
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
            value={data.date}
            name="date"
            placeholder="Дата"
            type="date"
          />
          <input
            onChange={changeData}
            value={data.direct}
            name="direct"
            placeholder="Направление"
            type="text"
          />
          <input
            onChange={changeData}
            value={data.phone}
            name="phone"
            placeholder="Контакты"
            type="phone"
          />
        </div>
        <button onClick={CreateMP}>Создать</button>
      </div>
    </>
  );
}
