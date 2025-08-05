import AnalyticsContent from "./AnalyticsContent";
import { useStore } from "../../context/admin/StoreContext";
const AdminDashboard = () => {
  const { isStoreOpen } = useStore();
  return (
    <>
      <AnalyticsContent />{" "}
    </>
  );
};

export default AdminDashboard;
