import NavBarAdmin from "../components/navBar/NavBarAdmin";
import Users from "./../components/Users";
import CreateUser from "./../components/CreateUser";

export default function UsersAdminPage() {
  return (
    <div className="bg-dark-blue md:grid md:grid-cols-10 h-screen p-2 ">
      <div className="col-span-2">
        <NavBarAdmin site1="/directora" site2="/usuarios" />
      </div>
      <div className="bg-grey-bg col-span-8 rounded-3xl m-1">
        <h1 className="font-bold text-2xl md:text-4xl m-2 md:m-5 lg:m-8 pt-4">
          Usuarios
        </h1>
        <div className="m-3 md:grid md:grid-cols-3 md:m-5 lg:m-10 gap-10 md:h-3/4">
          <div className="md:col-span-2 ">
            <Users />
          </div>
          <div className="pb-4 md:col-span-1 md:pb-0">
            <CreateUser />
          </div>
        </div>
      </div>
    </div>
  );
}
