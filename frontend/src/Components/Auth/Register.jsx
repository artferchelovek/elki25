import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./Login.css";

const api = "http://192.168.0.181:8000/auth/login";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
    name: "",
    surnmame: "",
  });

  function changeData(e) {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  }
  return <></>;
}
