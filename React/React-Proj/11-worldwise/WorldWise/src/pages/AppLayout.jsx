import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
function AppLayout() {
  return (
    <div className={styles.app}>
      {/* Not doing component composition to make page clean */}
      <Sidebar />
      <Map />
    </div>
  );
}

export default AppLayout;

//
