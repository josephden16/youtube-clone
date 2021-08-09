import loadingImg from "../../images/loading.svg";


export default function Loading() {
  return (
    <div className="flex flex-col items-center lg:items-center lg:text-left mb-8">
      <img src={loadingImg} className="w-10 lg:w-14 text-center" alt="Loading..." />
      <span>Fetching data...</span>
    </div>
  )
}
