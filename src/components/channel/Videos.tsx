import { useContext, useState } from "react";
import { Dialog } from "@headlessui/react";
import { UserContext } from "../providers/AuthProvider";
import VideoUpload from "./VideoUpload";
import ChannelVideosSkeleton from "./ChannelVideosSkeleton";
import ManageUploads from "./ManageUploads";
import { firestore } from "../../firebase";
import { toast } from "react-toastify";

export default function Videos({ id, videos, channelName, loading }) {
  const { user } = useContext(UserContext);
  const [selectedVideoData, setSelectedVideoData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const updateCurrentVideo = (video: any): void => {
    setSelectedVideoData(video);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    clearVideoData();
    setIsDeleteModalOpen(false);
  };

  const clearVideoData = () => {
    setSelectedVideoData(null);
  };

  if (loading) return <ChannelVideosSkeleton />;

  return (
    <section className="mx-2">
      <DeleteVideoModal
        isDelteModalOpen={isDeleteModalOpen}
        closeDeleteModal={closeDeleteModal}
        selectedVideoData={selectedVideoData}
      />
      {user.uid === id && (
        <VideoUpload user={user} channelName={channelName} channelId={id} />
      )}
      <ManageUploads
        videos={videos}
        updateCurrentVideo={updateCurrentVideo}
        openDeleteModal={openDeleteModal}
      />
    </section>
  );
}

function DeleteVideoModal({
  selectedVideoData,
  isDelteModalOpen,
  closeDeleteModal,
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    const { id } = selectedVideoData;
    setLoading(true);
    firestore
      .collection("videos")
      .doc(id)
      .delete()
      .then(() => {
        setLoading(false);
        closeDeleteModal();
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
        closeDeleteModal();
        toast.error("Failed to delete video. Something went wrong");
      });
  };

  return (
    <Dialog
      className="fixed z-10 inset-0 overflow-y-auto"
      open={isDelteModalOpen}
      onClose={closeDeleteModal}
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="relative bg-white dark:bg-dark2 dark:text-white rounded-lg max-w-sm sm:max-w-lg mx-auto py-10 px-6">
          <Dialog.Description className="font-bold text-sm sm:text-base text-center">
            Are you sure you want to delete this video?
          </Dialog.Description>
          <div className="text-center space-x-5 mt-6">
            <button
              disabled={loading}
              style={{ outline: "none" }}
              className="bg-red text-white font-semibold px-3 py-1 rounded-md"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              disabled={loading}
              style={{ outline: "none" }}
              className=""
              onClick={closeDeleteModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
