import ItemCard from "./ItemCard";
const UserDashboard = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      <ItemCard /> 
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
    </div>
  );
};

export default UserDashboard;
