import {
  faCalendarDay,
  faCircleXmark,
  faCircleCheck,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

export const handleStatusMeeting = (status) => {
  switch (status) {
    case "canceled":
      return faCircleXmark;
    case "pending":
      return faCalendarDay;
    case "completed":
      return faCircleCheck;
    default:
      return faCircleInfo;
  }
};
