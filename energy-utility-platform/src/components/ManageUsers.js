import React, { useState, useEffect, useMemo, useRef } from "react";
import UserService from "../services/user.service";

import { useTable } from "react-table";
import { useNavigate } from "react-router-dom";

import "bootstrap-icons/font/bootstrap-icons.css";
import 'font-awesome/css/font-awesome.min.css';

const ManageUsers = () => {
  const [Users, setUsers] = useState([]);
  const [searchName, setsearchName] = useState("");
  const UsersRef = useRef();
  const navigate = useNavigate();
  
  UsersRef.current = Users;

  useEffect(() => {
    retrieveUsers();
  }, []);

  const onChangesearchName = (e) => {
    const searchName = e.target.value;
    setsearchName(searchName);
  };

  const retrieveUsers = () => {
    UserService.getAllUsers()
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveUsers();
  };

  const removeAllUsers = () => {
    UserService.deleteAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  

  const findByName = () => {
    UserService.findByName(searchName)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  
  const addDevice = (rowIndex) => {
    const id = UsersRef.current[rowIndex].id;
    navigate("/add_device/"+id,{state: {userId: id,}} );
  }
  
 const addUser = () => {
   navigate("/add_user");
 }

  const editUser = (rowIndex) => {
    const id = UsersRef.current[rowIndex].id;
    console.log("Row index"+id);
    navigate("/edit_user/"+ id, {state: {userId: id,}});
  };

  const deleteUser = (rowIndex) => {
    const id = UsersRef.current[rowIndex].id;

    UserService.deleteUser(id)
      .then(
        (response) => {
          navigate("/manage_users");
          let newUsers = [...UsersRef.current];
          newUsers.splice(rowIndex, 1);

          setUsers(newUsers);
          window.location.reload()
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div className="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
              <div className="btn-group mr-2" role="group" aria-label="First group">
              <button className="btn btn-primary btn-m me-2" onClick={() => editUser(rowIdx)}>
                <i className="fa fa-edit"></i>
              </button>
              <button className="btn btn-danger btn-m me-2" onClick={() => deleteUser(rowIdx)}>
                <i className="fa fa-trash"></i>
              </button>
              <button className="btn btn-dark btn-m"onClick={() => addDevice(rowIdx)}>
                <i className="fa fa-microchip"></i>
              </button>
            </div>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: Users,
  });

  return (
    <div className="autumn">
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangesearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName(searchName)}
            >
              Search
            </button>
            <button
              className="btn btn-success ms-3"
              type="button"
              onClick={addUser}
            >
              Add New User
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered myTable"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default ManageUsers;