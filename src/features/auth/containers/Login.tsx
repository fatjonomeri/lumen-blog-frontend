import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../authSlice.ts";
import { useNavigate } from "react-router-dom";
import { InputHelper } from "@fattureincloud/fic-design-system";
import {
  ButtonWrapper,
  CardWrapper,
  FooterWrapper,
  FormTitle,
  InputWrapper,
} from "../styles/LoginStyles";

interface RootState {
  auth: {
    status: string;
    userInfo: UserInfo | null;
    isAuthenticated: boolean;
    error: { email: string[]; password: string[] } | null;
  };
}

interface UserInfo {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
  full_name: string;
  picture: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const { status, userInfo, isAuthenticated, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    inputRef.current?.focus();
    console.log(inputRef.current);
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = new FormData();
    body.append("email", email);
    body.append("password", password);

    dispatch(userLogin(body));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate, isAuthenticated]);

  return (
    <>
      <CardWrapper type="secondary" elevation="1" color="blue">
        {!isAuthenticated && (
          <>
            <FormTitle>Login</FormTitle>
            <form>
              <InputWrapper
                inputType="text"
                id="email"
                ref={inputRef}
                label="Email:"
                required
                inputSize="large"
                value={email}
                status={error?.email?.length > 0 ? "error" : "normal"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
              {error?.email?.length > 0 && (
                <InputHelper
                  icon={{
                    icon: {
                      icon: [
                        512,
                        512,
                        [],
                        "f013",
                        "M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z",
                      ],
                      iconName: "cog",
                      prefix: "fal",
                    },
                  }}
                  message={error.email[0]}
                  status="error"
                />
              )}
              <InputWrapper
                inputType="password"
                id="password"
                inputSize="large"
                label="Password:"
                required
                status={error?.password?.length > 0 ? "error" : "normal"}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
              {error?.password?.length > 0 && (
                <InputHelper
                  icon={{
                    icon: {
                      icon: [
                        512,
                        512,
                        [],
                        "f013",
                        "M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z",
                      ],
                      iconName: "cog",
                      prefix: "fal",
                    },
                  }}
                  message={error.password[0]}
                  status="error"
                />
              )}
            </form>
            <ButtonWrapper
              text="Login"
              size="large"
              isDisabled={status === "loading"}
              isLoading={status === "loading"}
              onClick={handleLogin}
            ></ButtonWrapper>
          </>
        )}
      </CardWrapper>
      <FooterWrapper elevation="0" color="transparent" type="primary">
        Don't have an account? <a href="/register">Register</a>
      </FooterWrapper>
    </>
  );
};

export default Login;
