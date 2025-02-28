import Header from "../Header/Header";
import "./Events.css";

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
