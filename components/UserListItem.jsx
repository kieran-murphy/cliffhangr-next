import Link from "next/link";

const UserListItem = ({ user }) => {
  return (
    <Link href={`/user/${user.id}`}>
      <div className="border border-cyan-400 cursor-pointer m-4 w-1/3">
        <h1 className="text-bold">{user.username}</h1>
      </div>
    </Link>
  );
};

export default UserListItem;
