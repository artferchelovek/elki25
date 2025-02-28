import Header from "./Header/Header";
import "./Main.css";
import main1 from "../assets/main1.jpg";

export default function Main() {
  return (
    <>
      <Header></Header>

      <div id="content">
        <p className="main-recom">мы рекомендуем</p>
        <div className="content-info">
          <img className="main-image" src={main1} alt="" />
          <div className="main-content-text">
            <p className="main-title">80 лет победы</p>
            <p className="main-descr">
              Заместитель художественного руководителя – директора Московского
              государственного академического театра «Русская песня» Сергей
              Рябов рассказал, что 9 мая на сцене театра пройдет премьерный
              показ спектакля «Василий Теркин». Постановка также войдет в
              репертуар театра. Об этом он сообщил на пресс-конференции.
            </p>
            <div className="main-date">
              <p>12 марта 2025 год</p>
              <p>12:00</p>
            </div>
          </div>
        </div>
        <button className="main-enter">Я приду!</button>
      </div>
    </>
  );
}
