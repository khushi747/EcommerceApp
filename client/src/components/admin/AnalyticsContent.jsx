const AnalyticsContent = () => {
  return (
    <div className="flex w-full  items-center justify-around  p-4   ">
      <div className="card w-2/7 h-50 bg-base-100 card-lg bg-blue-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Total Orders placed</h2>
          <hr />

          <h1 className="card-title">25 Orders</h1>
        </div>
      </div>
      <div className="card w-2/7 h-50 bg-base-100 card-lg bg-blue-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Inventory</h2>
          <hr />

          <p>Electrical - 100 Items</p>
          <p>Clothing - 200 Items</p>
          <p>Home & Kitchen - 150 Items</p>
        </div>
      </div>
      <div className="card w-2/7 h-50 bg-base-100 card-lg bg-blue-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Monthly Revenue </h2>
          <hr />
          <h1 className="card-title">₹ 50,000</h1>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsContent;
