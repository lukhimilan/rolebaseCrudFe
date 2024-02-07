import React from "react";
import { API } from "../API";
import { Toaster } from "react-hot-toast";

const UsersList = () => {
  const [users, setUsers] = React.useState();

  const getUser = React.useCallback(async () => {
    const getAllUser = await API.get("/user/all");
    const response = getAllUser.data;
    setUsers(response?.data?.users);
  }, []);

  React.useEffect(() => {
    getUser();
  }, [getUser]);

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
                    MobileNumber
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
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};
export default UsersList;
