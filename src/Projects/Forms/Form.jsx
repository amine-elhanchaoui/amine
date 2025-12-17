import { useEffect, useState } from "react";

export default function Form() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setValid] = useState(false);
  const [error, setError] = useState({ name: "", pass: "" });

  let errors = {
    Passinfo: { name: "pass", Message: "invalid password" },
    Nameinfo: { name: "name", Message: "invalid name" },
  };

  let users = {
    user1: { name: "Amine", password: "12345" },
    user2: { name: "Mohammed", password: "admin" },
  };

  let ValidInputs = () => {
    if (
      (name === users.user1.name && password === users.user1.password) ||
      (name === users.user2.name && password === users.user2.password)
    ) {
      setValid(true);
    } else {
      let nameError = "";
      let passError = "";

      if (name !== users.user1.name && name !== users.user2.name)
        nameError = errors.Nameinfo.Message;
      if (password !== users.user1.password && password !== users.user2.password)
        passError = errors.Passinfo.Message;

      setError({ name: nameError, pass: passError });
    }
  };

  let submitted = (event) => {
    event.preventDefault();
    ValidInputs();
  };
  useEffect(() => {
    document.title = `${name} ${password}`;
  }, [name, password]);

  let RenderForm = (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow-sm" style={{ width: "350px" }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={submitted}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={(event) => setName(event.target.value)}
            />
            {error.name && <div className="text-danger mt-1">{error.name}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="pass"
              onChange={(event) => setPassword(event.target.value)}
            />
            {error.pass && <div className="text-danger mt-1">{error.pass}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Inscrire
          </button>
        </form>
      </div>
    </div>
  );

  let Acceuil = (
    <div className="container text-center mt-5">
      <h1>Accueil</h1>
      <h2>Bonjour {name}</h2>
    </div>
  );

  return isValid ? Acceuil : RenderForm;
}
