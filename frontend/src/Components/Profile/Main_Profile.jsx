import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import DF_User from "./User";

const api = "http://192.168.0.181:8000/auth/me";
const token = localStorage.getItem("token");

const header = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export default function SelectRole() {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getdata() {
      try {
        const response = await axios.get(api, {
          headers: header,
        });

        console.log(response.data);

        if (response.data["role"] == "visitor") {
          localStorage.setItem("name", response.data["name"]);
          navigate("./u");
        } else if (response.data["role"] == "org") {
          return <p>орг</p>;
        }
      } catch (e) {
        console.log(e);
      }
    }

    getdata();
  }, []);

  return <></>;
}
