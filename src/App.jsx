import "./App.css";
import Page from "./components/page";
import { useForm } from "react-hook-form";
import { useState } from "react";

const URL1 =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR7p91mdEj3E7UcmAjwFpcE1evDLh6T5J1IWMJ1TR0tSV7Tyue4m0CKLj84R3PcbgMz6d-Krmziszj_/pub?gid=919346490&single=true&output=csv";
const URL2 =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR7p91mdEj3E7UcmAjwFpcE1evDLh6T5J1IWMJ1TR0tSV7Tyue4m0CKLj84R3PcbgMz6d-Krmziszj_/pub?gid=122819438&single=true&output=csv";

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
          <button onClick={() => setOption(!option)}>TM</button>
          <button onClick={() => setOption(!option)}>LH</button>

          {!option && <Page URL={URL1} login={login} entityType="TM" />}
          {option && <Page URL={URL2} login={login} entityType="LH" />}
        </>
      )}
    </div>
  );
}

export default App;
