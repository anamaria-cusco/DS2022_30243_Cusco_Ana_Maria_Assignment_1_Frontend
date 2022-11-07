import React, { useState, useEffect, useMemo, useRef } from "react";
import DatePicker from "react-datepicker"
import ClientService from "../services/client.service";
import AuthService from "../services/auth.service";
import { useTable } from "react-table";
import { useNavigate } from "react-router-dom";

import "bootstrap-icons/font/bootstrap-icons.css";
import 'font-awesome/css/font-awesome.min.css';
import "react-datepicker/dist/react-datepicker.css";
import UserService from "../services/user.service";
import { format } from 'date-fns';

const Devices = () => {
  var selectedDate;
  const [Devices, setDevices] = useState([]);
  const [searchDescription, setSearchDescription] = useState("");
  const DevicesRef = useRef();
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();
  const [startDate, setStartDate] = useState(new Date());
  DevicesRef.current = Devices;

  useEffect(() => {
    retrieveDevices();
  }, []);

  const onChangeSearchDescription = (e) => {
    const searchDescription = e.target.value;
    setSearchDescription(searchDescription);
  };

  const retrieveDevices = (id) => {
    ClientService.getUserDevices(user.id)
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
  

/*
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
  */
/*
  const findByDescription = () => {
    TutorialDataService.findByDescription(searchDescription)
      .then((response) => {
        setDevices(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  */

  const viewDailyConsumption = (rowIndex, startDate) => {
    localStorage.getItem("date");
    console.log("Date:" + startDate);
    console.log("Selected Date:" + selectedDate);
    const id = DevicesRef.current[rowIndex].id;
    navigate("/view_daily_consumption/"+ id, {state: {deviceId: id, date: selectedDate}});
  };
  
  const onChangeDate = (date) =>{
    var formatedDate = format(date, 'yyyy-MM-dd');
    localStorage.setItem("date", JSON.stringify(formatedDate));
    setStartDate(date);
    selectedDate = date;
  }
  
 


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
            <button className="btn btn-primary btn-m me-2" onClick={() => viewDailyConsumption(rowIdx, startDate)}>
              <i className="fa fa-bolt"></i>
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
    <div className="list-row">
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
              onClick={console.log("Searching..")}
            >
              Search
            </button>
            <DatePicker  
              selected={ startDate }  placeholderText="Select Date"    
              onChange={ (date) => onChangeDate(date)}  
              name="startDate"  
              dateFormat="MM/dd/yyyy"  
             />  
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

export default Devices;