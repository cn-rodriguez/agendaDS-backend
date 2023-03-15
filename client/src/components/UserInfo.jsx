import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

import UserForm from "./UserForm";

export default function UserInfo({ user, users, handleReload }) {
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <div className="bg-slate-400 p-2 rounded-md shadow-md">
        <UserForm user={user} users={users} />
      </div>
    </>
  );
}
