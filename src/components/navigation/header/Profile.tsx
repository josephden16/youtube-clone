import { BiLogIn } from "react-icons/bi";

const Profile = ({ user, handleModal, handleSignIn, loading }) => {
  if (loading)
    return (
      <div
        className="rounded-circle bg-lightGray3 dark:bg-lightGray2 animate-pulse h-4 w-32 mt-1 lg:mt-2"
        style={{ width: "30px", height: "30px" }}
      />
    );

  if (user) {
    return (
      <button style={{ outline: "none" }} onClick={handleModal}>
        <img
          className="hover:opacity-70 rounded-circle mt-1 lg:mt-1 ml-2 cursor-pointer"
          style={{ width: "30px", height: "30px" }}
          src={user.photoURL}
          alt="profile"
        />
      </button>
    );
  }
  return (
    <button
      style={{ outline: "none" }}
      onClick={handleSignIn}
      className="focus:text-opacity-60 flex items-center outline-none rounded-md border-black dark:border-lightGray"
    >
        <BiLogIn style={{top: '4px'}} className="relative left-1 text-2xl" />
    </button>
  );
};

export default Profile;
