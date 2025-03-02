import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./Login.css";

const api = "http://192.168.10.176:8000/auth/register";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
    name: "",
    surname: "",
    email: "",
    birthday: "",
    phone_number: "",
    role: "",
  });

  async function Register() {
    const userData = {
      username: data.username,
      password: data.password,
      name: data.name,
      surname: data.surname,
      birthday: data.birthday,
      role: data.role,
      email: "1111",
      phone_number: "+799641290794",
    };

    const header = {
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(api, userData, { headers: header });
      console.log(response.data, response.status);

      if (response.status == 200) {
        navigate("/auth");
      }
    } catch (e) {
      console.log(e);
    }
  }

  function changeData(e) {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });

    console.log(data);
  }
  return (
    <>
      <div className="login-block">
        <div id="login-form">
          <p className="title">Регистрация</p>
          <div className="form-inputs">
            <div className="split-div">
              <input
                id="name"
                name="name"
                onChange={changeData}
                value={data.name}
                type="text"
                placeholder="Имя"
              />
              <input
                placeholder="Фамилия"
                id="surname"
                name="surname"
                onChange={changeData}
                value={data.surname}
                type="text"
              />
            </div>

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
            <input
              placeholder="День рождения"
              id="birthday"
              name="birthday"
              onChange={changeData}
              value={data.birthday}
              type="date"
            />
            <p id="login-error" className="login-error"></p>
          </div>
          <div className="choose-role">
            <div className="role">
              <input
                onChange={changeData}
                value={"visitor"}
                type="checkbox"
                name="role"
                id=""
              />
              <p>Участник</p>
            </div>
            <div className="role">
              <input
                onChange={changeData}
                value={"organizer"}
                type="checkbox"
                name="role"
                id=""
              />
              <p>Организатор</p>
            </div>
          </div>
          <button onClick={Register} className="form-submit">
            Продолжить
          </button>
        </div>
      </div>
    </>
  );
}
