import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaUsers,
  FaMapMarkerAlt,
  FaMoneyBill,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-64 bg-blue-700 text-white min-h-screen p-5">

      <h1 className="text-2xl font-bold mb-10">
        🚚 Last Mile
      </h1>

      <ul className="space-y-6">

        <li className="flex items-center gap-3 cursor-pointer hover:text-yellow-300">
          <FaTachometerAlt />
          Dashboard
        </li>

        <Link to="/orders">
        <li className="flex items-center gap-3 cursor-pointer hover:text-yellow-300">
          <FaBox />
          Orders
        </li>
        </Link>

        <Link to="/agents">
  <li className="flex items-center gap-3 cursor-pointer hover:text-yellow-300">
    <FaUsers />
    Agents
  </li>
</Link>
        <Link to="/zones">
        <li className="flex items-center gap-3 cursor-pointer hover:text-yellow-300">
          <FaMapMarkerAlt />
          Zones
        </li>
        </Link>

        <Link to="/ratecards">
     <li className="flex items-center gap-3 cursor-pointer hover:text-yellow-300">
    <FaMoneyBill />
    Rate Cards
  </li>
</Link>

      </ul>

      <div className="absolute bottom-8">
        <button className="flex items-center gap-3 hover:text-red-300">
          <FaSignOutAlt />
          Logout
        </button>
      </div>

    </div>
  );
}

export default Sidebar;