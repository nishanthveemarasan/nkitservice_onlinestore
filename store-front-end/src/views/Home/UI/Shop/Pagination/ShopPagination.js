const ShopPagination = (props) => {
  const data = props.data;
  const from = data.from;
  const to = data.to;
  const total = data.total;
  const links = data.links;
  return (
    <div className="d-flex justify-content-md-between mb-5">
      <div>{`Showing ${from} - ${to} results of ${total}`}</div>
      <div>
        <ul className="pagination">
          {links &&
            links.map((link, i) => {
              return (
                <li key={i} className={`page-item ${link.active && "active"}`}>
                  {i === 0 && (
                    <span
                      style={{
                        backgroundColor: "white",
                        padding: "8px 16px",
                        color: "black",
                        border: "0.5px solid rgba(0,0,0,0.3)",
                      }}
                      onClick={() => props.pageChange(link.url)}
                    >
                      &laquo;
                    </span>
                  )}
                  {i === links.length - 1 && (
                    <span
                      style={{
                        backgroundColor: "white",
                        padding: "8px 16px",
                        color: "black",
                        border: "0.5px solid rgba(0,0,0,0.3)",
                      }}
                      onClick={() => props.pageChange(link.url)}
                    >
                      &raquo;
                    </span>
                  )}
                  {i !== 0 && i !== links.length - 1 && (
                    <span
                      // className="page-link"
                      style={{
                        backgroundColor: "blue",
                        padding: "8px 16px",
                        color: "white",
                        border: "0.5px solid rgba(0,0,0,0.3)",
                      }}
                      onClick={() => props.pageChange(link.url)}
                    >
                      {link.label}
                    </span>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
export default ShopPagination;
