import { useDispatch } from "react-redux";
import { useState } from "react";
import { register } from "../store/auth/slice";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmed_password: "",
    terms: false,
  });

  function handleOnRegister(e) {
    e.preventDefault();

    if (!e.target.terms.checked) {
      alert("you have to accept terms and tonditions to register");
      return;
    }
    dispatch(register(newUser));
    history.push("./galleries");
  }

  return (
    <div>
      <form onSubmit={handleOnRegister} className="px-4 my-3">
        <h3>register page</h3>
        <label>first name: </label>{" "}
        <input
          placeholder="first name"
          required
          type="text"
          value={newUser.first_name}
          onChange={(e) =>
            setNewUser({ ...newUser, first_name: e.target.value })
          }
        />
        <br />
        <br />
        <label>last name: </label>{" "}
        <input
          placeholder="last name"
          required
          type="text"
          value={newUser.last_name}
          onChange={(e) =>
            setNewUser({ ...newUser, last_name: e.target.value })
          }
        />
        <br />
        <br />
        <label>email address: </label>{" "}
        <input
          type="email"
          placeholder="enter email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <br />
        <br />
        <label>password: </label>{" "}
        <input
          type="password"
          placeholder="password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <br />
        <br />
        <label>confirm password: </label>{" "}
        <input
          required
          type="password"
          value={newUser.confirmed_password}
          onChange={(e) =>
            setNewUser({ ...newUser, confirmed_password: e.target.value })
          }
        />
        <br />
        <br />
        <input
          type="checkbox"
          label="I accept terms and conditions"
          required
          name="terms"
          value={true}
          onChange={(e) => setNewUser({ ...newUser, terms: e.target.checked })}
        />{" "}
        <label>I accept terms and conditions</label>
        <br />
        <br />
        <Button type="submit" variant="primary">
          register
        </Button>
      </form>
    </div>
  );
}
