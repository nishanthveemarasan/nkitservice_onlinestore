import Table from "react-bootstrap/Table";
const CTable = (props) => {
  const Header = props.header.map((th, i) => {
    return <th key={i}>{th}</th>;
  });
  return (
    <>
      <Table responsive="md" striped bordered hover>
        <thead variant="info">
          <tr>{Header}</tr>
        </thead>
        <tbody>{props.children}</tbody>
      </Table>
    </>
  );
};
export default CTable;

/*

state.providerData.data.map((row, i) => {
            return (
              <tr key={i}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.provider_code}</td>
                <td>{row.status}</td>
                <td>{row.updated_at}</td>
              </tr>
            );
          })

*/
