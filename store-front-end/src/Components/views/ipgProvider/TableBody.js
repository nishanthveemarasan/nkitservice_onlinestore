import Badge from "react-bootstrap/Badge";
import { CIcon } from "@coreui/icons-react";
import classes from "./IpgProvider.module.css";
const TableBody = (props) => {
  return (
    <>
      {props.data.map((row, i) => {
        return (
          <tr key={i}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.provider_code}</td>
            <td>{getBadge(row.status)}</td>
            <td>{getDate(row.updated_at)}</td>
            <td>
              <CIcon name="cil-trash" size="2xl" className={classes.color} />
            </td>
          </tr>
        );
      })}
    </>
  );
};
export default TableBody;

const getDate = (value) => {
  const date = new Date(value);
  const getYear = date.getFullYear();
  const getMonth = date.getMonth() + 1;
  const getDay = date.getDate();

  const constructDate = `${getYear}-${getMonth
    .toString()
    .padStart(2, "0")}-${getDay.toString().padStart(2, "0")}`;
  return constructDate;
};

const getBadge = (value) => {
  switch (value) {
    case "1":
      return <Badge variant="success">Active</Badge>;
    case "0":
      return <Badge variant="danger">Inactive</Badge>;
  }
};
