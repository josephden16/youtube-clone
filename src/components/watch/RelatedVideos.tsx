import Switch from '@bit/codyooo.rc-demo.switch';
import Video from './Video';


export default function RelatedVideos({ checked, handleSwitch, relatedVideos }) {
  return (
    <div className="space-y-6 ml-3 mr-3 lg:m-0">
      <div style={{ alignItems: 'center' }} className="video flex flex-row justify-between">
        <h3 className="text-2xl font-bold">Next</h3>
        <div className="mr-2">
          <span className="uppercase font-bold text-xs">Autoplay</span>
          <Switch checked={checked} onClick={handleSwitch} className="ml-2" />
        </div>
      </div>
      <div className="flex flex-col space-y-6">
        {relatedVideos && relatedVideos.map((video: any) => {
          return <Video key={video.id} video={video} />
        })}
      </div>
    </div>
  )
}
