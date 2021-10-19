const Profile = ({ user, handleModal, handleSignIn }) => {
  if (user) {
    return (
      <button style={{ outline: "none" }} onClick={handleModal}>
        <img
          className="hover:opacity-70 rounded-circle mt-1 lg:-mt-1 ml-2 cursor-pointer"
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
      className="focus:text-opacity-60 space-x-1 py-1 px-3 ml-3 -mr-1 mt-1 lg:mb-1 flex items-center outline-none border-1 rounded-sm border-red dark:border-lightGray"
    >
      <span className="text-xs dark:text-lightGray text-red">SIGN IN</span>
    </button>
  );
};

export default Profile;
