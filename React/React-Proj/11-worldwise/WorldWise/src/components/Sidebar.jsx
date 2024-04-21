import SidebarFooter from "./SidebarFooter";
import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      {/* same as children prop */}
      <Outlet />
      <SidebarFooter />
    </div>
  );
}

export default Sidebar;
