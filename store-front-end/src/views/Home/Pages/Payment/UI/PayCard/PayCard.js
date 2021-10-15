import { CCard, CCardHeader, CCol, CRow, CCardBody } from "@coreui/react";
import AInput from "../AInput";
import ASelect from "../ASelect";
import classes from "./PayCard.module.css";
const PayCard = (props) => {
  return (
    <CRow>
      <CCol xs="12" sm="12">
        <CCard>
          <CCardBody>
            <CRow>
              <AInput
                styleLabel={classes.label}
                styleInput={classes.input2}
                label="Name"
                type="text"
                size={{ sm: "12", md: "12", lg: "12" }}
              />
            </CRow>
            <CRow>
              <AInput
                styleLabel={classes.label}
                styleInput={classes.input2}
                label="Credit Card Number"
                type="text"
                placeHolder="0000 0000 0000 0000"
                size={{ sm: "12", md: "12", lg: "12" }}
              />
            </CRow>
            <CRow>
              <ASelect
                styleLabel={classes.label}
                styleInput={classes.input1}
                size={{ sm: "12", md: "4", lg: "4" }}
                label="Month"
                options={[
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                ]}
              />
              <ASelect
                styleLabel={classes.label}
                styleInput={classes.input1}
                size={{ sm: "12", md: "4", lg: "4" }}
                label="Year"
                options={[
                  "2021",
                  "2022",
                  "2023",
                  "2024",
                  "2025",
                  "2026",
                  "2027",
                ]}
              />

              <AInput
                styleLabel={classes.label}
                styleInput={classes.input1}
                label="CVV/CVC"
                type="text"
                placeHolder="cvv"
                size={{ sm: "12", md: "4", lg: "4" }}
              />
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};
export default PayCard;
