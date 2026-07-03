function DashboardCard({ title, value, className }) {
  return (
    <div className={`rounded-xl p-6 shadow-lg text-white ${className}`}>
      <h3 className="text-lg">{title}</h3>

      <h1 className="text-4xl font-bold mt-3">
        {value}
      </h1>
    </div>
  );
}

export default DashboardCard;