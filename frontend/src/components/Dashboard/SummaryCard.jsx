/* eslint-disable react/prop-types */



const SummaryCard = ({icon, text, number, color}) => {
  return (
    <div className="roundedb flex bg-white">
      <div className={`text-3xl flex justify-center items-center  text-white px-4 ${color}`}>
        {icon}
      </div>
      <div className="pl-4 py-1">
        <p className="text-lg font-semibold">{text}</p>
        <p className="text-xl font-bold">{number}</p>
      </div>
    </div>
  )
}

export default SummaryCard
