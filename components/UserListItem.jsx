import Link from "next/link";

const UserListItem = ({ user }) => {
  return (
    <Link href={`/user/${user.id}`}>
      <button className="btn btn-active btn-neutral my-2 w-full">
        {user.username}
      </button>
    </Link>
  );
};

export default UserListItem;
