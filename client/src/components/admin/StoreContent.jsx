import ItemCard from "./ItemCard";

const StoreContent = () => {
  const updateStore = () => {
    // Logic to update the store content
  };
  return (
    <div>
      <div className="flex  justify-end pt-2 pr-6">
        <button
          onClick={() => updateStore()}
          className="btn btn-primary bg-black border-3px-solid border-black"
        >
          Update
        </button>
      </div>
      <div className="flex w-full items-center justify-around p-4 gap-4 flex-wrap">
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>{" "}
    </div>
  );
};

export default StoreContent;
