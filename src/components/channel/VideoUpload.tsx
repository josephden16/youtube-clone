import { ImAttachment } from "react-icons/im";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { firestore, storage } from "../../firebase";
import loadingImg from "../../images/loading.svg";

const VideoUpload = ({ channelId, channelName, user }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [, setVideoURL] = useState("");
  const [posterURL, setPosterURL] = useState("");
  const [duration, setDuration] = useState(null);

  const videoFile = useRef(null);
  const posterFile = useRef(null);
  const defaultPoster: string =
    "https://firebasestorage.googleapis.com/v0/b/fir-fc298.appspot.com/o/posters%2Fdefault(1).webp?alt=media&token=72d58d6b-0968-4071-ae3a-cbb8bef5631b";
  const videoRef = firestore.collection("videos");
  const defaultVideoData = {
    views: 0,
    likes: 0,
    unlikes: 0,
    comments: 0,
  };

  const updateDuration = () => {
    window.URL = window.URL || window.webkitURL;
    let video = document.createElement("video");
    video.preload = "metadata";
    let duration: number;
    video.onloadedmetadata = function () {
      window.URL.revokeObjectURL(video.src);
      duration = parseInt(video.duration.toString(), 10);
      setDuration(duration);
    };
    video.src = URL.createObjectURL(videoFile.current.files[0]);
  };

  const uploadVideoAndPosterFile = (fileType: string) => {
    let videoFileName: string = uuidv4();
    let posterFileName: string = uuidv4();
    storage
      .ref()
      .child("posters")
      .child(posterFileName)
      .put(posterFile.current.files[0])
      .then((response) => response.ref.getDownloadURL())
      .then((posterURL) => {
        setPosterURL(posterURL);
        toast.success("Poster file uploaded");
        storage
          .ref()
          .child("videos")
          .child(videoFileName)
          .put(videoFile.current.files[0])
          .then((response) => response.ref.getDownloadURL())
          .then((videoURL) => {
            setVideoURL(videoURL);
            const ref = videoRef.doc();
            const id = ref.id;
            videoRef
              .doc(id)
              .set({
                id: id,
                title: title,
                description: description,
                channelId: channelId,
                channelName: channelName,
                type: fileType,
                duration: duration,
                videoURL: videoURL,
                posterURL: posterURL ? posterURL : defaultPoster,
                timeUploaded: new Date(),
                ...defaultVideoData,
              })
              .then(() => {
                toast.success("Video upload successful 🎉");
                setLoading(false);
                document.location.reload();
              })
              .catch(() => {
                toast.error("Upload failed");
                setLoading(false);
              });
          })
          .catch(() => {
            toast.error("Video upload failed");
            setLoading(false);
          });
      })
      .catch(() => {
        toast.error("Poster upload failed");
        setLoading(false);
      });
  };

  const uploadOnlyVideoFile = (fileType: string) => {
    let videoFileName = uuidv4();
    storage
      .ref()
      .child("videos")
      .child(videoFileName)
      .put(videoFile.current.files[0])
      .then((response) => response.ref.getDownloadURL())
      .then((videoURL) => {
        setVideoURL(videoURL);
        const ref = videoRef.doc();
        const id = ref.id;
        videoRef
          .doc(id)
          .set({
            id: id,
            title: title,
            description: description,
            channelId: channelId,
            channelName: channelName,
            type: fileType,
            duration: duration,
            videoURL: videoURL,
            posterURL: posterURL ? posterURL : defaultPoster,
            timeUploaded: new Date(),
            ...defaultVideoData,
          })
          .then(() => {
            toast.success("Video upload successful 🎉");
            setLoading(false);
            document.location.reload();
          })
          .catch(() => {
            toast.error("Upload failed");
            setLoading(false);
          });
      })
      .catch(() => {
        toast.error("Video upload failed");
        setLoading(false);
      });
  };

  const validateFormData = (): boolean => {
    let isValid: boolean = true;
    if (videoFile.current?.files.length < 1) {
      toast.error("A video file must be selected");
      isValid = false;
    }

    if (!title) {
      toast.error("Enter a title for your video");
      isValid = false;
    }

    if (!description && description.length < 20) {
      toast.error("Enter a description for your video of the required length");
      isValid = false;
    }
    return isValid;
  };

  const resetInputs = (): void => {
    setPosterURL("");
    setVideoURL("");
    videoFile.current = null;
  };

  const handleUpload = () => {
    const isFormValid: boolean = validateFormData();

    if (!isFormValid) return;

    const { type } = videoFile.current.files[0];
    if (loading) {
      toast.info("A video is currently uploading");
      return;
    }

    if (videoFile) {
      setLoading(true);
      if (posterFile.current.files.length > 0) {
        // if a poster file exist
        uploadVideoAndPosterFile(type);
      } else {
        uploadOnlyVideoFile(type);
      }
    }
  };

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    handleUpload();
    resetInputs();
  };

  if (!user) return null;

  return (
    <>
      <div className="mb-7 lg:mb-12">
        <h2 className="font-bold text-3xl">Upload a video</h2>
        <form className="mt-6 dark:text-black flex flex-col space-y-5">
          <input
            onChange={(evt) => setTitle(evt.target.value)}
            type="text"
            style={{ outline: "none" }}
            className="focus-within:border-red bg-lightGray p-2 w-11/12 lg:w-96 rounded-md"
            name="title"
            placeholder="title*"
            title="title"
          />
          <textarea
            onChange={(evt) => setDescription(evt.target.value)}
            style={{ outline: "none" }}
            className="focus-within:border-red bg-lightGray p-2 w-11/12 lg:w-96 rounded-md"
            name="description"
            title="description"
            minLength={20}
            maxLength={3000}
            placeholder="description* (between 20-3000 characters)"
          ></textarea>
          <div className="dark:text-lightGray text-black text-sm space-x-2 font-bold w-11/12 lg:w-96 flex flex-col flex-nowrap">
            <label
              htmlFor="poster"
              className="flex flex-row items-center w-56 space-x-3 bg-red text-white font-bold rounded-md p-2 cursor-pointer hover:opacity-80"
            >
              <input
                ref={posterFile}
                type="file"
                className="hidden"
                accept="image/*"
                id="poster"
                name="poster"
                placeholder="Video poster"
                title="poster"
              />
              <ImAttachment size="1.2em" /> <span>Attach Poster</span>
            </label>
            <span>
              {posterFile.current && posterFile.current.files[0]?.name}
            </span>
          </div>
          <div className="flex flex-col dark:text-lightGray text-black text-sm w-11/12 font-bold lg:w-96 space-x-2">
            <label
              htmlFor="video"
              className="flex items-center space-x-3 w-56 bg-red text-white font-bold rounded-md p-2 cursor-pointer hover:opacity-80"
            >
              <input
                accept="video/*"
                className="hidden"
                onChange={updateDuration}
                ref={videoFile}
                type="file"
                name="file"
                id="video"
              />
              <ImAttachment size="1.2em" className="text-white" />
              <span>Attach Video</span>
            </label>
            <span className="">
              {videoFile.current && videoFile.current.files[0]?.name}
            </span>
          </div>
          <button
            disabled={loading ? true : false}
            onClick={!loading ? handleSubmit : null}
            className="bg-red h-11  text-white hover:opacity-90 font-bold rounded-md w-32 p-2 flex flex-col items-center cursor-pointer"
          >
            <span className={loading ? "flex" : "hidden"}>
              <img src={loadingImg} className="w-8" alt="loading..." />
            </span>
            <span className={loading ? "hidden" : "flex"}>Upload</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default VideoUpload;
