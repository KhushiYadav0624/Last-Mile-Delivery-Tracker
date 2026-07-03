function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-white shadow-md p-5 flex justify-between">

      <h2 className="text-2xl font-bold">
        Dashboard
      </h2>

      <div>
        Welcome,
        <span className="font-bold text-blue-600">
          {" "}
          {user?.name}
        </span>
      </div>

    </div>
  );
}

export default Navbar;