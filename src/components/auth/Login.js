import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { API } from "../../API";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setAuth, setUserRole } = useAuth();
  const { auth } = useAuth();
  useEffect(() => {
    if (auth?.user) {
      navigate("/user-dashboard");
    }
  }, [auth?.user, navigate]);
  const onSubmit = async (data) => {
    try {
      const login = await API.post("/auth/signin", data);
      const response = login?.data;
      if (response?.success) {
        localStorage.setItem("user", JSON.stringify(response?.data?.user));
        localStorage.setItem("authToken", response?.data?.accessToken);
        const user = response?.data?.user;
        const role = response?.data?.user?.role;
        const accessToken = response?.data?.accessToken;
        setUserRole([role]);
        setAuth({ user: user, role: [role], accessToken: accessToken });
        toast.success(response.message);
        const path =
          role === "admin"
            ? "/admin-dashboard"
            : role === "user"
            ? "/user-dashboard"
            : "/moderator-dashboard";
        navigate(path);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container vw-100 vh-100 d-flex justify-content-center align-items-center">
        <div className="form-width m-auto ">
          <div className="shadow bg-white pt-4 pb-4 rounded">
            <div className="ps-3 pe-3 ps-md-5 pe-md-5">
              <h3
                className="fs-2 text-center title"
                style={{ color: "rgb(34, 34, 34)", fontWeight: "700" }}
              >
                Login Here!
              </h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group ">
                  <label className="lable-fw-size">
                    Email <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    autoComplete="off"
                    className="form-control mt-1 form-fs form-label-border p-3"
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <span className="text-danger">{errors.email.message}</span>
                  )}
                </div>

                <div className="form-group mt-3">
                  <label className="lable-fw-size">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    {...register("password", {
                      required: true,
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                    })}
                    type="password"
                    className="form-control mt-1 form-fs form-label-border p-3"
                    placeholder="Enter Password"
                  />
                  {errors.password && (
                    <span className="text-danger">password is required</span>
                  )}
                </div>
                <div className="form-group mt-3">
                  <div className="text-end text-primary title btn-link">
                    <Link to={"/signup"}>Sign up ? </Link>
                  </div>
                </div>
                <div className="form-group row mt-2">
                  <div className="d-grid gap-2 mb-4 ">
                    <button
                      type="submit"
                      className="btn btn-gradient-primary mt-3 text-uppercase"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
};
export default Login;
