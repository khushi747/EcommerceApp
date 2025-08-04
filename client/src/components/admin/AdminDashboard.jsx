import AnalyticsContent from "./AnalyticsContent";
import StoreContent from "./StoreContent";
import { useStore } from "../../context/admin/StoreContext";
const AdminDashboard = () => {
  const { isStoreOpen } = useStore();
  return <>{isStoreOpen ? <StoreContent /> : <AnalyticsContent />}</>;
};

export default AdminDashboard;
