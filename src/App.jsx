import "./App.css";
import Page from "./components/page";
import { useForm } from "react-hook-form";
import { useState } from "react";

const URL1 =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS7oLcX-viOSwVfc-bGPcF0ZBHyzO5EncSP4T7xmgMznLSwZMVwNUW6y9Z0tUTYtS0Wtbyk67hxHkUk/pub?gid=1326264409&single=true&output=csv";
const URL2 =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS7oLcX-viOSwVfc-bGPcF0ZBHyzO5EncSP4T7xmgMznLSwZMVwNUW6y9Z0tUTYtS0Wtbyk67hxHkUk/pub?gid=1847454951&single=true&output=csv";

function App() {
  const [login, setLogin] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [option, setOption] = useState();

  const onSubmit = (data) =>
    setLogin(data.username === "root" && data.password === "12345");

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="username"
          type="text"
          {...register("username", { required: true })}
        />
        {errors.username && <p style={{ color: "red" }}>*username required</p>}

        <input
          placeholder="password"
          type="password"
          {...register("password", { required: true })}
        />

        {errors.password && <p style={{ color: "red" }}>*password required</p>}
        <input type="submit" />
      </form>

      {login && (
        <>
          <button onClick={() => setOption(!option)}>T1MGHC</button>
          <button onClick={() => setOption(!option)}>LFS</button>

          {!option && <Page URL={URL1} login={login} entityType="T1MGHC" />}
          {option && <Page URL={URL2} login={login} entityType="LFS" />}
        </>
      )}
    </div>
  );
}

export default App;
