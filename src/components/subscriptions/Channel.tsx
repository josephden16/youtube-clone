import { Link } from 'react-router-dom'


export default function Channel({ channel }) {
  return (
    <div>
      <Link to={"/channel/" + channel.id} className="flex flex-col items-center space-y-1 hover:opacity-70">
        <img src={channel.channelPhotoURL} className="w-12 lg:w-14 rounded-circle" alt="channel" />
        <span className="text-xs lg:text-sm">{channel.channelDisplayName}</span>
      </Link>
    </div>
  )
}
