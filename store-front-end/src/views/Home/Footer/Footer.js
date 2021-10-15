import CIcon from "@coreui/icons-react";
import { CButton, CCol, CRow } from "@coreui/react";
import CartItem from "../UI/CartItem";
import BrandButton from "./BrandButton/BrandButton";
import Cards from "./Cards";
import ContactItem from "./ContactItem/ContactItem";
import classes from "./Footer.module.css";
import LinkItem from "./LinkItem/LinkItem";
const Footer = () => {
  return (
    <div className={classes.footer}>
      <CRow>
        <CCol sm={12} md={6} lg={4}>
          <div className={classes.heading}>RELAXHOUSE.</div>
          <div className={classes.description}>
            Combining our love for colour and design, we’ve set out to create a
            fresh, dynamic and above all affordable design offering.From the
            smallest Homeware to a luxurious Dining Table and Chairs, you'll be
            sitting on for years to come, we promise that everything isn't just
            brilliantly designed and manufactured, but also has one eye on the
            future.
          </div>
          <div className={classes.brand}>
            <BrandButton brandClass="btn-facebook" brandIcon="cib-facebook" />
            <BrandButton brandClass="btn-instagram" brandIcon="cib-instagram" />
            <BrandButton brandClass="btn-twitter" brandIcon="cib-twitter" />
            <BrandButton brandClass="btn-vk" brandIcon="cib-vk" />
          </div>
        </CCol>
        <CCol sm={12} md={6} lg={4}>
          <div className={classes.heading}>Useful Links</div>
          <CRow className="mt-5 mb-5">
            <CCol xs={2} sm={2}></CCol>
            <CCol xs={4} sm={4}>
              <div className={classes.usefullLinks}>
                <LinkItem item="Home" />
                <LinkItem item="About Us" />
                <LinkItem item="Shop" />
                <LinkItem item="Contact Us" />
                <LinkItem item="Privacy Policy" />
                <LinkItem item="Terms and Conditions" />
              </div>
            </CCol>
            <CCol xs={4} sm={4}>
              <div className={classes.usefullLinks}>
                <LinkItem item="Cart" />
                <LinkItem item="Order Tracking" />
                <LinkItem item="Warranty and Services" />
                <LinkItem item="Infomation Wall" />
                <LinkItem item="Accessories" />
                <LinkItem item="Featured" />
              </div>
            </CCol>
            <CCol xs={2} sm={2}></CCol>
          </CRow>
        </CCol>
        <CCol sm={12} md={6} lg={4}>
          <div className={classes.heading}>Contact</div>
          <ContactItem
            iconName="cil-location-pin"
            info="49 Central Rd Eastern Province 31000 Sri Lanka"
          />
          <ContactItem iconName="cil-phone" info="+12-3456789" />
          <ContactItem
            iconName="cil-envelope-closed"
            info="contactusemail@myshop.com"
          />
          <div style={{ margin: "5% 0% 3% 5%" }}>
            <Cards />
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm={12} className="text-center">
          <p style={{ fontSize: "140%" }}>
            © Copyright 2021 Relaxhouse. All Rights Reserved.
          </p>
        </CCol>
      </CRow>
    </div>
  );
};
export default Footer;
