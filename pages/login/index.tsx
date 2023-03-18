import { useCreateUser } from "../../query/users";

export default function Login() {
  const createUser = useCreateUser({ userName: "affbcddsssddddddddddd" });

  return (
    <button type="button" onClick={() => createUser.mutate()}>
      버튼
    </button>
  );
}
