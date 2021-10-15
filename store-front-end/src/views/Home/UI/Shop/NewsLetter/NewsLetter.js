import SInputGroup from "../../Input/SInputGroup";
import SButton from "../../SButton";

const NewsLetter = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "5% 0%",
      }}
    >
      <div style={{ fontWeight: "bolder", fontSize: "300%" }}>NewsLetter</div>
      <div style={{ fontSize: "130%", marginBottom: "3%" }}>
        Get timely updates from your favorite products
      </div>
      <div style={{ width: "100%", backgroundColor: "gray" }}>
        <SInputGroup
          padding="3.5% 1%"
          placeholder="Enter your email here"
          type="text"
          append={true}
          weight="bolder"
          name="Subscribe"
          color="primary"
          showName={true}
          showSpinner={false}
        />
      </div>
    </div>
  );
};
export default NewsLetter;
