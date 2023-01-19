export const handleRole = (role) => {
  switch (role) {
    case "STUDENT_ROLE":
      localStorage.setItem("rol", "student");
    case "ADMIN_ROLE":
      localStorage.setItem("rol", "administracion");
  }
};
