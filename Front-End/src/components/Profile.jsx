function Profile({ user }) {
  return (
    <div className="flex items-center gap-4">
      <h2 className="text-lg font-bold">{user.name}</h2>
      <div className="avatar">
        <div className=" w-10 rounded-full overflow-hidden">
          <img src={user.img} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
