import "./Header.css";

export default function Header() {
  return (
    <>
      <div id="header">
        <p className="header-name">название</p>

        <nav className="header-nav">
          <p className="header-link">мероприятия</p>
          <p className="header-link">платформы</p>
          <p className="header-link">контакты</p>
        </nav>

        <button className="header-login">вход</button>
      </div>
    </>
  );
}
