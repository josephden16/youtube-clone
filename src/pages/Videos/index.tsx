import React, { useContext, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Authentication from '../../components/Authentication';
import Header from '../../components/Header';
import MobileFooter from '../../components/MobileFooter';
import { UserContext } from '../../components/providers/AuthProvider';
import { firestore, storage } from '../../firebase';
import loadingImg from '../../images/loading.svg';


const Video = () => {
  const user = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [videoURL, setVideoURL] = useState("");
  const [posterURL, setPosterURL] = useState("");
  const [duration, setDuration] = useState(null);

  const videoFile: any = useRef(null);
  const posterFile: any = useRef(null);

  // const channelRef = firestore.collection("channels").doc(user.uid).collection("videos");
  const videoRef = firestore.collection("videos");
  const defaultVideoData = {
    views: 0,
    likes: 0,
    unlikes: 0,
    comments: 0,
  }
  const defaultPoster = "https://firebasestorage.googleapis.com/v0/b/fir-fc298.appspot.com/o/posters%2Fdefault(1).webp?alt=media&token=72d58d6b-0968-4071-ae3a-cbb8bef5631b";

  const updateDuration = () => {
    window.URL = window.URL || window.webkitURL;
    let video = document.createElement("video");
    video.preload = "metadata";
    let duration: number;
    video.onloadedmetadata = function () {
      window.URL.revokeObjectURL(video.src);
      duration = parseInt(video.duration.toString(), 10);
      setDuration(duration);
    }
    video.src = URL.createObjectURL(videoFile.current.files[0]);
  }

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    if (loading) {
      toast.info("A video is currently uploading");
      return;
    }
    if (!videoFile) {
      toast.error("A video file must be selected");
      return;
    }

    if (!title) {
      toast.error("Enter a title for your video");
      return;
    }

    if (!description) {
      toast.error("Enter a description for your video");
      return;
    }
    const { type } = videoFile.current.files[0];
    // console.log(type, name, size, duration);
    // console.log(videoFile.current.files[0]);

    if (videoFile) {
      setLoading(true);
      if (posterFile.current.files.length > 0) {
        storage.ref()
          .child('posters')
          .child(posterFile.current.name)
          .put(posterFile.current.files[0])
          .then(response => response.ref.getDownloadURL())
          .then(posterURL => {
            setPosterURL(posterURL);
            toast.success("Poster file uploaded");
          })
          .catch(() => {
            toast.error("Poster upload failed");
            setLoading(false);
          })
      }
      storage.ref()
        .child('videos')
        .child(videoFile.current.name)
        .put(videoFile.current.files[0])
        .then(response => response.ref.getDownloadURL())
        .then(videoURL => {
          setVideoURL(videoURL);
          const ref = videoRef.doc();
          const id = ref.id;
          videoRef.doc(id).set({
            id: id,
            title: title,
            description: description,
            type: type,
            duration: duration,
            videoURL: videoURL,
            posterURL: posterURL ? posterURL : defaultPoster,
            timeUploaded: new Date(),
            ...defaultVideoData
          })
            .then(() => {
              toast.success("Video upload successful 🎉");
              setLoading(false);
            })
            .catch(() => {
              toast.error("Upload failed");
              setLoading(false);
            })
        })
        .catch(() => {
          toast.error("Video upload failed");
          setLoading(false);
        })
    }

    setPosterURL("");
    setVideoURL("");
  }
  if (!user) {

    return (
      <>
        <div className="lg:ml-0">
          <Header />
        </div>
        <main className="lg:mt-32">
          <Authentication />
        </main>
        <div>
          <MobileFooter />
        </div>
      </>
    )
  }

  return (
    <>
      <div className="lg:ml-1">
        <Header />
      </div>
      <main className="">
        <h2 className="text-center font-bold text-3xl mt-12">Upload a video</h2>
        <form className="mt-6 dark:text-black flex flex-col items-center space-y-5">
          <input onChange={(evt) => setTitle(evt.target.value)} type="text" style={{ outline: 'none' }} className="focus-within:border-red bg-lightGray p-2 w-11/12 lg:w-96 rounded-md" name="title" placeholder="title" title="title" />
          <input onChange={(evt) => setDescription(evt.target.value)} type="text" style={{ outline: 'none' }} className="focus-within:border-red bg-lightGray p-2 w-11/12 lg:w-96 rounded-md" name="description" title="description" minLength={40} maxLength={300} placeholder="description" />
          <div className="dark:text-lightGray text-black text-sm text-center space-x-2 font-bold w-11/12 lg:w-96 flex">
            <label htmlFor="poster" >Video poster (optional):</label>
            <input ref={posterFile} type="file" accept="image/*" id="poster" name="poster" placeholder="Video poster" title="poster" />
          </div>
          <div className="dark:text-lightGray text-black text-sm w-11/12 font-bold lg:w-96 text-center space-x-2">
            <label htmlFor="video">Video:</label>
            <input accept="video/*" onChange={updateDuration} ref={videoFile} type="file" name="file" id="video" />
          </div>
          <button disabled={loading ? true : false} onClick={handleSubmit} className="bg-red text-white font-bold rounded-md w-32 p-2 flex flex-col items-center cursor-pointer">
            <span className={loading ? 'flex' : 'hidden'}>
              <img src={loadingImg} className="w-8" alt="loading..." />
            </span>
            <span className={loading ? 'hidden' : 'flex'}>
              Upload
            </span>
          </button>
        </form>
      </main>
      <div>
        <MobileFooter />
      </div>
    </>
  )
}


export default Video;
