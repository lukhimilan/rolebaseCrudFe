import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../API";
import Modal from "react-bootstrap/Modal";
import toast, { Toaster } from "react-hot-toast";

const ManageUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = React.useState();
  const [loggedUser, setLoggedUser] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserID] = useState("");
  const getUser = React.useCallback(async () => {
    const getAllUser = await API.get("/user/all");
    const response = getAllUser.data;
    setUsers(response?.data?.users);
  }, []);

  const loginUser = React.useCallback(async () => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    const { data } = await API.get(`/user/${loggedUser._id}`);
    if (data.success) {
      setLoggedUser(data.data);
    }
  }, []);
  React.useEffect(() => {
    loginUser();
    getUser();
  }, [getUser, loginUser]);
  const onDelete = async () => {
    const { data } = await API.delete(`/user/${deleteUserId}`);
    if (data.success) {
      setDeleteModal(false);
      toast.success(data.message);
      getUser();
    }
  };

  const handleClose = () => setDeleteModal(false);

  return (
    <>
      <div className="container mt-3 container-main">
        <div className="d-flex align-items-center justify-content-between">
          <h3 className="page-title">Users</h3>
        </div>
        <div
          className="mt-3 bg-white rounded card-trans p-md-4 p-3 "
          style={{
            maxHeight: "800px",
            overflow: "auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div className="table-responsive text-wrap mt-4 table-Fixed">
            <table className="table table-fixed">
              <thead className="table">
                <tr>
                  <th scope="col" className="lable-fw-size">
                    Email
                  </th>
                  <th scope="col" className="lable-fw-size">
                    Name
                  </th>
                  <th scope="col" className="lable-fw-size">
                    Role
                  </th>
                  <th scope="col" className="lable-fw-size">
                    Charge
                  </th>
                  <th scope="col" className="lable-fw-size"></th>
                </tr>
              </thead>
              <tbody className="table-bordered">
                {users?.map((el, key) => {
                  return (
                    <React.Fragment key={key}>
                      <tr className="lable-fw-size">
                        <td>{el.email}</td>
                        <td>{el.name}</td>
                        <td>{el.role}</td>
                        <td>{el.mobileNo}</td>
                        <td>
                          <Link
                            to="/edit-user"
                            state={{ id: el._id }}
                            className="text-primary title btn-link"
                          >
                            Edit
                          </Link>{" "}
                          {" | "}{" "}
                          <Link
                            onClick={() => {
                              setDeleteUserID(el._id);
                              setDeleteModal(true);
                            }}
                            data-toggle="modal"
                            data-target="#exampleModal"
                            className="text-primary title btn-link"
                          >
                            Delete User
                          </Link>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {deleteModal && (
          <Modal show={deleteModal} onHide={handleClose} centered>
            <Modal.Header className="px-4 " closeButton>
              <Modal.Title className="ms-auto page-title">
                Delete User
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete User!</Modal.Body>
            <Modal.Footer>
              <button
                className="btn-light fw-bold p-2 border rounded"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="btn-gradient-primary fw-bold p-2 border rounded"
                onClick={onDelete}
              >
                Confirm
              </button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
      <Toaster />
    </>
  );
};
export default ManageUser;
