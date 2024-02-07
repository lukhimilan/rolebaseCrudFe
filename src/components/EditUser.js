import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../API";
import { ArrowLeft } from "react-bootstrap-icons";

const EditUser = () => {
  let { state } = useLocation();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: async () =>
      await (
        await API.get(`/user/${state.id}`)
      ).data.data,
  });

  const onSubmit = async (data) => {
    try {
      delete data.updatedAt;
      delete data.createdAt;
      const response = await (await API.put(`/user/${state.id}`, data)).data;
      if (response?.success) {
        toast.success(response?.message);
        navigate("/manage-users");
      }
    } catch (error) {}
  };
  return (
    <>
      <div className="container mt-3 container-main">
        <h3 className="page-title">Edit User</h3>
        <div>
          <button
            style={{
              cursor: "pointer",
              backgroundColor: "#e2e6ea",
              border: "none",
            }}
            className="nav-font p-2 m-auto rounded mt-2"
            onClick={() => navigate("/manage-users")}
          >
            <ArrowLeft size={20} />
          </button>
        </div>
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
    </>
  );
};
export default EditUser;
