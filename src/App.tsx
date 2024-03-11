// import { useState } from 'react'
import "./App.css";
// import { Radio } from '@fattureincloud/fic-design-system'
import { Button, InputText } from "@fattureincloud/fic-design-system";
import { useState } from "react";
import { useSessionStorage } from "react-use";
// import { useFetchApi } from "./hooks/useFetchApi";
import { useFetchApi } from "./hooks/useFetchAPI.ts";

function App() {
  const [sessionToken, setSessionToken] = useSessionStorage("sessionToken", "");
  const formdata = new FormData();

  const { isLoading, data, error, fetchApi } = useFetchApi(
    "/auth/register",
    formdata,
    "POST"
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleRegister = () => {
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("first_name", firstName);
    formdata.append("last_name", lastName);
    fetchApi();
    // console.log(response.json());
  };

  return (
    <>
      {/* <Radio value={true } /> */}
      {/* <Button text="button1"/> */}
      <InputText
        inputSize="large"
        inputType="text"
        label={<label>Email</label>}
        placeholder="Email"
        required
        onChange={(e) => setEmail(e.target.value)}
        // setValue={(e) => setEmail(e.target.value)}
        status="normal"
        value={email}
      />
      <InputText
        inputSize="large"
        inputType="text"
        color="white"
        label="Password"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
        // setValue={function noRefCheck(){}}
        // type="password"
        status="normal"
        value={password}
      />
      <InputText
        inputSize="large"
        inputType="text"
        color="white"
        label="First Name"
        placeholder="First Name"
        required
        onChange={(e) => setFirstName(e.target.value)}
        // setValue={function noRefCheck(){}}
        // type="password"
        status="normal"
        value={firstName}
      />
      <InputText
        inputSize="large"
        inputType="text"
        color="white"
        label="Last Name"
        placeholder="Last Name"
        required
        onChange={(e) => setLastName(e.target.value)}
        // setValue={function noRefCheck(){}}
        // type="password"
        status="normal"
        value={lastName}
      />
      <Button text="Register" onClick={handleRegister}></Button>
    </>
  );
}

export default App;
