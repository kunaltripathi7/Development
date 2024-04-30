import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import styles from "./AppLayout.module.css";
function AppLayout() {
  return (
    <div className={styles.app}>
      {/* Not doing component composition to make page clean */}
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
