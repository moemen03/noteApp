import style from "./Login.module.css";
import LoginImage from "../../assets/images/login.webp";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { sendDataToLogin, token, setToken } = useContext(UserContext);

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("please enter a valid email"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z]/, "password must start with uppercase letter"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema,

    onSubmit: async function (values) {
      setIsLoading(true);
      const response = await sendDataToLogin(values);
      setIsLoading(false);

      if (response.msg === "done") {
        localStorage.setItem("token", `3b8ny__${response.token}`);
        setToken(response.token);
      }
    },
  });

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  return (
<section className="min-h-screen flex items-center justify-center">
  <div className={`${style.container} flex flex-wrap`}>
    <figure className="w-full md:w-2/3 m-0 p-0">
      <div className="image-container">
        <img src={LoginImage} className="w-full" alt="Register Image" />
      </div>
    </figure>
    <form
      className="w-full md:w-1/3 flex flex-col justify-center px-5"
      onSubmit={formik.handleSubmit}
    >
      <h2 className="m-0 font-bold font-Montserrat">
        Welcome Back <i className="fa-solid fa-heart ms-0 text-main"></i>
      </h2>
      <p className="mb-3">
        Thanks for returning! Please sign in to access your account.
      </p>
      <div className="flex flex-col gap-2 justify-center">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          name="email"
          id="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />

        {formik.errors.email && formik.touched.email ? (
          <p className="error">{formik.errors.email}</p>
        ) : (
          ""
        )}

        <input
          type="password"
          className="form-control"
          placeholder="Password"
          name="password"
          id="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />

        {formik.errors.password && formik.touched.password ? (
          <p className="error">{formik.errors.password}</p>
        ) : (
          ""
        )}

        <button type="submit" className="btn btn-main">
          {isLoading ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            "Login"
          )}
        </button>
        <p>
          You don't have an account yet?
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  </div>
</section>

  );
}
