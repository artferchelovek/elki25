import axios from "axios";
import { useEffect, useState } from "react";
import "./Users.css";
import { useNavigate } from "react-router";

const token = localStorage.getItem("token");

export default function User_Info() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const [role, setRole] = useState();

  useEffect(() => {
    async function getuserdata() {
      try {
        const res = await axios.get("http://192.168.10.176:8000/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);

        if (res.data.role == "visitor") {
          setRole("Участник");
        } else {
          setRole("Организатор");
        }
      } catch (e) {}
    }

    getuserdata();
  }, []);
  //   const replacePhone = (phone) =>
  //     phone
  //       .split("")
  //       .map((el, i) =>
  //         i === 1 || i === 4 || i === 7 || i === 9 ? el + " " : el
  //       )
  //       .join("");
  return (
    <div id="user-info">
      <div className="header">
        <div className="user-logo">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_6_12100)">
              <path
                d="M16.5 12C17.88 12 18.99 10.88 18.99 9.5C18.99 8.12 17.88 7 16.5 7C15.12 7 14 8.12 14 9.5C14 10.88 15.12 12 16.5 12ZM9 11C10.66 11 11.99 9.66 11.99 8C11.99 6.34 10.66 5 9 5C7.34 5 6 6.34 6 8C6 9.66 7.34 11 9 11ZM16.5 14C14.67 14 11 14.92 11 16.75V19H22V16.75C22 14.92 18.33 14 16.5 14ZM9 13C6.67 13 2 14.17 2 16.5V19H9V16.75C9 15.9 9.33 14.41 11.37 13.28C10.5 13.1 9.66 13 9 13Z"
                fill="#323232"
              />
            </g>
            <defs>
              <clipPath id="clip0_6_12100">
                <rect width="50" height="50" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>

        <p className="user-name">
          {data.name} {data.surname}
        </p>
        <p className="user-phlog">
          {data.phone_number} ¬ {data.username}
        </p>
        <p className="user-role">{role}</p>
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
    </div>
  );
}
