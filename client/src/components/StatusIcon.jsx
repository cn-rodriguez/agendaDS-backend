import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleStatusMeeting } from "../helpers/handleStatus";

export default function StatusIcon({ status }) {
  const iconStatus = handleStatusMeeting(status);
  return (
    <>
      <FontAwesomeIcon icon={iconStatus} />
    </>
  );
}
