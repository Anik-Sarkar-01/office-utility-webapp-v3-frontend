import React, { useContext, useState } from "react";
import userContext from "../../context/userContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";

const API_BASE_URL = "https://office-utility-webapp-v3-backend.vercel.app";

const EMAIL_PATTERN = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_PATTERN = /^[a-zA-Z0-9@*#$%^&*!]{8,}$/;

const EyeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const FormField = ({
  id,
  label,
  type,
  placeholder,
  icon,
  register,
  errors,
  required,
  pattern,
  patternMessage,
  children,
}) => (
  <div
    style={{
      marginBottom: "1rem",
      width: "100%",
      boxSizing: "border-box",
    }}
  >
    <label
      htmlFor={id}
      style={{
        display: "block",
        fontSize: "13px",
        fontWeight: "500",
        color: "#111",
        marginBottom: "6px",
      }}
    >
      {label}
    </label>

    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: "11px",
          color: "#aaa",
          pointerEvents: "none",
          display: "flex",
        }}
      >
        {icon}
      </span>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        style={{
          width: "100%",
          boxSizing: "border-box",
          height: "40px",
          padding: "0 38px",
          border: "1px solid rgba(0,0,0,0.15)",
          borderRadius: "8px",
          fontSize: "14px",
          color: "#111",
          background: "#fff",
          outline: "none",
        }}
        {...register(id, {
          required: {
            value: required,
            message: "This field is required.",
          },
          pattern: {
            value: pattern,
            message: patternMessage,
          },
        })}
      />

      {children}
    </div>

    {errors?.message && (
      <p
        style={{
          fontSize: "12px",
          color: "#c0392b",
          margin: "5px 0 0",
        }}
      >
        {errors.message}
      </p>
    )}
  </div>
);

const LoginUser = () => {
  const authUser = useContext(userContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/superuser/login`,
        {
          email: data.email,
          password: data.password,
        }
      );

      const { _id, isSuperUser } = response.data.user;

      message.success("Login successful!");

      authUser.login(response.data.token, _id, isSuperUser);

      navigate("/");
    } catch {
      message.warning("Invalid email or password.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: "#fff",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "12px",
          padding: "2.5rem 2rem",
          width: "420px",
          boxSizing: "border-box",
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            background: "#E6F1FB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.5rem",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#185FA5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>

        {/* Heading */}
        <p
          style={{
            fontSize: "18px",
            fontWeight: "500",
            margin: "0 0 4px",
            color: "#111",
          }}
        >
          Welcome back
        </p>

        <p
          style={{
            fontSize: "13px",
            color: "#888",
            margin: "0 0 1.75rem",
          }}
        >
          Log in to your account to continue.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          style={{
            width: "100%",
          }}
        >
          {/* Inner Container */}
          <div
            style={{
              width: "92%",
              margin: "0 auto",
              padding: "0.5rem 0",
              boxSizing: "border-box",
            }}
          >
            <FormField
              id="email"
              label="Email address"
              type="email"
              placeholder="abc@gmail.com"
              icon={<MailIcon />}
              register={register}
              errors={errors.email}
              required={true}
              pattern={EMAIL_PATTERN}
              patternMessage="Please enter a valid email address."
            />

            <FormField
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              icon={<LockIcon />}
              register={register}
              errors={errors.password}
              required={true}
              pattern={PASSWORD_PATTERN}
              patternMessage="Password must be at least 8 characters."
            >
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                style={{
                  position: "absolute",
                  right: "11px",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  color: "#aaa",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </FormField>

            {/* Forgot Password */}
            <p
              style={{
                textAlign: "right",
                fontSize: "13px",
                color: "#185FA5",
                marginTop: "-4px",
                marginBottom: "1.25rem",
                cursor: "pointer",
              }}
              onClick={() =>
                message.info("Contact IT Department")
              }
            >
              Forgot password?
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: "100%",
                height: "40px",
                background: "#185FA5",
                border: "none",
                borderRadius: "8px",
                color: "#E6F1FB",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>

              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginUser;