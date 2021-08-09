import Channels from "./Channels";
import Videos from "./Videos";


export default function Main({ user }) {
  return (
    <div className="flex flex-col w-full lg:-ml-3 xl:-ml-5">
      <div className="no-scrollbar ml-2 lg:ml-0">
        <Channels user={user} />
      </div>
      <div className="m-10">
        <Videos user={user} />
      </div>
    </div>
  )
}