import { useParams } from "react-router-dom";

export default function UserPage() {
  const { id } = useParams();
  console.log("🚀 ~ file: UserPage.jsx:5 ~ UserPage ~ id", id);

  return (
    <div>
      User <h1>{id}</h1>
    </div>
  );
}
