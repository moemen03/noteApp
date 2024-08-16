import style from "./Layout.module.css";
import Sidebar from "../Sidebar/Sidebar.jsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <div className={`flex min-h-screen items-stretch ${style.dark}`}>
        <div className={`${style.sidebar}`}>
          <Sidebar />
        </div>

        <div className={`${style.content}`}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
