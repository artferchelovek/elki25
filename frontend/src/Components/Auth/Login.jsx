import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./Login.css";

const api = "http://192.168.10.176:8000/auth/login";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  function changeData(e) {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  }

  async function Login(event) {
    event.preventDefault();
    const userData = {
      grant_type: "password",
      username: data.username,
      password: data.password,
      scopes: "",
      client_id: "",
      client_secret: "",
    };

    const header = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    console.table(userData);

    try {
      const response = await axios.post(api, userData, {
        headers: header,
      });
      console.log(response.data, response.status);

      if (response.status == 200) {
        localStorage.setItem("token", response.data["access_token"]);
        navigate("/profile");
      }
    } catch (e) {
      if (e.response.status == 401) {
        document.getElementById(
          "login-error"
        ).innerHTML = `неправильное имя пользователя или пароль`;
      } else {
        console.log(e);
      }
    }

    useEffect(() => {
      localStorage.clear();
    }, []);
  }

  return (
    <>
      <div className="login-block">
        <div id="login-form">
          <p className="title">Авторизация</p>
          <div className="form-inputs">
            <input
              id="username"
              name="username"
              onChange={changeData}
              value={data.username}
              type="text"
              placeholder="Логин"
            />
            <input
              placeholder="Пароль"
              id="password"
              name="password"
              onChange={changeData}
              value={data.password}
              type="password"
            />
            <p id="login-error" className="login-error"></p>
          </div>
          <button onClick={Login} className="form-submit">
            Продолжить
          </button>
        </div>
        <p
          onClick={() => {
            navigate("./r");
          }}
          className="nonacc"
        >
          Ещё нет аккаунта?
        </p>
      </div>
    </>
  );
}
