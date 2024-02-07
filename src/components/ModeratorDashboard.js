import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { API } from "../API";
import { useNavigate, Link } from "react-router-dom";

const ModeratorDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { register, handleSubmit } = useForm({
    defaultValues: async () =>
      await (
        await API.get(`/user/${user._id}`)
      ).data.data,
  });

  const onSubmit = async (data) => {
    try {
      delete data.updatedAt;
      delete data.createdAt;
      const response = await (await API.put(`/user/${user._id}`, data)).data;
      if (response?.success) {
        toast.success(response?.message);
        navigate("/manage-users");
      }
    } catch (error) {}
  };
  return (
    <div>
      <div className="container mt-3 container-main">
        <h3 className="page-title">User Profile</h3>
        <div className="card-trans">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-9 p-4 bg-white rounded">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label className="lable-fw-size">Email</label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    className="form-control mt-1 form-fs form-label-border p-2"
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="lable-fw-size">Name</label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    className="form-control mt-1 form-fs form-label-border p-2"
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="lable-fw-size">role</label> <br />
                  <select
                    className="form-group mt-3"
                    aria-label="Default select example"
                    {...register("role")}
                  >
                    <option value="user" selected={register.role === "user"}>
                      User
                    </option>
                    <option
                      value="moderator"
                      selected={register.role === "moderator"}
                    >
                      Moderator
                    </option>
                    <option value="admin" selected={register.role === "admin"}>
                      Admin
                    </option>
                  </select>
                </div>
                <div className="form-group mt-3">
                  <label className="lable-fw-size">Mobile Number</label>
                  <input
                    {...register("mobileNo", { required: true })}
                    type="text"
                    className="form-control mt-1 form-fs form-label-border p-2"
                  />
                </div>
                <button type="submit" className="btn btn-gradient-primary mt-3">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModeratorDashboard;
