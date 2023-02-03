import { useDispatch } from "react-redux";
import { login } from "../store/auth/slice";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handleOnLogin(e) {
    e.preventDefault();
    dispatch(login(data));
    console.log("success!");
    history.push("/galleries");
  }

  return (
    <div>
      <form onSubmit={handleOnLogin} className="px-4 my-3">
        <h3>login page</h3>
        <label>email: </label>{" "}
        <input
          required
          type="email"
          placeholder="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <br />
        <br />
        <label>password:</label>{" "}
        <input
          required
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <br />
        <br />
        <Button type="submit" variant="primary">
          login
        </Button>
      </form>
    </div>
  );
}
