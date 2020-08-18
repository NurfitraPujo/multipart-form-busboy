import React, { useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);

  const handleUsername = (event) => setUsername(event.target.value);
  const handleEmail = (event) => setEmail(event.target.value);
  const handleFile = (event) => setFile(event.target.files[0]);

  const submit = (event) => {
    event.preventDefault();

    const form = new FormData();
    form.append("username", username);
    form.append("email", email);
    form.append("file", file);
    console.log(username, email, file)
    console.log(form)

    return Axios.post("http://localhost:8080/submit-form", form).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="App">
      <form onSubmit={submit}>
        <input
          type={"text"}
          name="username"
          id="username"
          onChange={handleUsername}
        />
        <input type={"email"} name="email" id="email" onChange={handleEmail} />
        <input type="file" name="file" id="file" onChange={handleFile} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
