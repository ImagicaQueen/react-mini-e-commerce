import React, { Fragment, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import { TableProps } from "../../interfaces/table";
import "./Table.css";

import TitleWrapper from "../layout/TitleWrapper";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";

import { Search } from "react-bootstrap-icons";
import AddToCart from "../addToCart/AddToCart";
import AddCategory from "../category/AddCategory";

const Table = ({
  columns,
  isProduct,
  data,
  handleDelete,
  deleteCategoryWithProduct,
  isDeleteRecordData,
  handleEdit,
  addCount,
  tableHeading,
  isConfirm,
}: TableProps) => {
  const [searchName, setSearchName] = useState("");

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "30px 0px",
        }}
      >
        <div style={{ marginRight: "50%" }}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="search name..."
              aria-label="search name..."
              aria-describedby="basic-addon1"
              type="text"
              value={searchName}
              style={{ padding: "0px 20px 0px 2px" }}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <InputGroup.Text id="basic-addon1">
              <Search size={16} color="black" />
            </InputGroup.Text>
          </InputGroup>
        </div>

        <div
          style={{ marginRight: "60px", display: "flex", marginTop: "-10px" }}
        >
          <div>
            <TitleWrapper
              tag="h3"
              text={tableHeading}
              color="black"
              fontWeight="400"
            />
          </div>
        </div>
      </div>

      <MDBTable>
        <MDBTableHead>
          <tr>
            {data.length > 0 ? (
              columns.map((item: string, index: number) => (
                <th style={{ fontWeight: "800" }} key={item}>
                  {item}
                </th>
              ))
            ) : (
              <h2 style={{ color: "red", textAlign: "center" }}>
                No data available
              </h2>
            )}
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {data.length > 0 &&
            data
              .filter((value) =>
                value.name.toLowerCase().includes(searchName.toLowerCase())
              )
              .map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  {isProduct && <td>{row.title}</td>}
                  {isProduct && <td>{row.price}</td>}
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(row.id)}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(row.id)}
                    >
                      Delete
                    </Button>
                  </td>
                  {isConfirm && (
                    <td>
                      <Button
                        variant="info"
                        onClick={()=>isDeleteRecordData(row.id)}
                      >
                        Force Delete
                      </Button>
                    </td>
                  )}
                  {isProduct && (
                    <td>
                      <Button
                        variant="success"
                        onClick={() => addCount(row.id)}
                      >
                        Add{" "}
                        <i
                          style={{ paddingLeft: "5px", fontSize: "15px" }}
                          className="bi bi-cart3"
                        ></i>
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
        </MDBTableBody>
      </MDBTable>
    </Fragment>
  );
};

export default Table;

