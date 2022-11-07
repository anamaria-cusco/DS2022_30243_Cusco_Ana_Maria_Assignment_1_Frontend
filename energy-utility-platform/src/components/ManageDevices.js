import React, { useState, useEffect, useMemo, useRef } from "react";
import DeviceService from "../services/device.service";
import { useTable } from "react-table";
import { useNavigate } from "react-router-dom";
import '../App.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import 'font-awesome/css/font-awesome.min.css';

const ManageDevices = () => {
  const [Devices, setDevices] = useState([]);
  const [searchDescription, setSearchDescription] = useState("");
  const DevicesRef = useRef();
  const navigate = useNavigate();
  
  DevicesRef.current = Devices;

  useEffect(() => {
    retrieveDevices();
  }, []);

  const onChangeSearchDescription = (e) => {
    const searchDescription = e.target.value;
    setSearchDescription(searchDescription);
  };

  const retrieveDevices = () => {
    DeviceService.getAllDevices()
      .then((response) => {
        setDevices(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveDevices();
  };

  const removeAllDevices = () => {
    DeviceService.deleteAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  

  const findByDescription = () => {
    DeviceService.findByDescription(searchDescription)
      .then((response) => {
        setDevices(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  

  const editDevice = (rowIndex) => {
    const id = DevicesRef.current[rowIndex].id;
    console.log("Row index"+id);
    navigate("/edit_device/"+ id, {state: {deviceId: id,}});
  };

  const deleteDevice = (rowIndex) => {
    const id = DevicesRef.current[rowIndex].id;

    DeviceService.deleteDevice(id)
      .then(
        (response) => {
          navigate("/manage_devices");
          let newDevices = [...DevicesRef.current];
          newDevices.splice(rowIndex, 1);

          setDevices(newDevices);
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
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Max Consumption",
        accessor: "maxConsumption",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div className="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
              <div className="btn-group mr-2" role="group" aria-label="First group">
              <button className="btn btn-primary btn-m me-2" onClick={() => editDevice(rowIdx)}>
                <i className="fa fa-edit"></i>
              </button>
              <button className="btn btn-danger btn-m me-2" onClick={() => deleteDevice(rowIdx)}>
                <i className="fa fa-trash"></i>
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
    data: Devices,
  });

  return (
    <div className="autumn">
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by description"
            value={searchDescription}
            onChange={onChangeSearchDescription}
            
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByDescription(searchDescription)}
            >
              Search
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

      <div className="col-md-8">
        <button className="btn btn-sm btn-danger" onClick={removeAllDevices}>
          Remove All
        </button>
      </div>
    </div>
    </div>
  );
};

export default ManageDevices;