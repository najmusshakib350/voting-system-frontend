import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { NavLink } from "react-router-dom";
import SidebarData from "./SidebarData";
import { IconContext } from "react-icons";
import { PHOTOAPI } from "./../../utils/config";
import { userInfo } from "../../utils/Auth";
import { actiongetUserProfile } from "./../../redux/ActionCreators";
import { connect } from "react-redux";
//import default user photo
import image from "./../../assets/img/default.jpg";
import {
  Container,
  Row,
  Col,
  Nav,
  Figure,
  DropdownButton,
} from "react-bootstrap";
//redux state
function mapStateToProps(state) {
  return state;
}
//redux dispatch
function mapDispatchToProps(dispatch) {
  return {
    userProfile: function (token) {
      return dispatch(actiongetUserProfile(token));
    },
  };
}

//Navbar component
function Navbar(props) {
  //react state
  const [sidebar, setSidebar] = useState(false);
  //useEffect hook
  useEffect(function () {
    const { token } = userInfo();
    props.userProfile(token);
  }, []);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  let sidebarDropdown = sidebar
    ? `${styles.nav_menu} ${styles.active}`
    : `${styles.nav_menu}`;
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className={`${styles.navbar}`}>
          <Container fluid>
            <Row>
              <Col xs={4} sm={2} md={2} lg={2} xlg={2}>
                <NavLink
                  to="#"
                  className={`${styles.menu_bars} ${styles.menu_link}`}
                >
                  <FaIcons.FaBars onClick={showSidebar} />
                </NavLink>
              </Col>
              <Col xs={8} sm={10} md={10} lg={10} xlg={10}>
                <Col className="userProfileContainer">
                  <Figure className="userProfileContainer__item">
                    {props.getUserProfile.photo === "none" ? (
                      <Figure.Image src={`${image}`} />
                    ) : (
                      <Figure.Image
                        src={`${PHOTOAPI}/image/profile/${props.getUserProfile.photo}`}
                      />
                    )}
                  </Figure>
                  <h6 className="userProfileContainer__item heading-six ">
                    {props.getUserProfile.name.split(" ")[0]}
                  </h6>
                  <DropdownButton
                    id="dropdown-button-dark-example2"
                    variant="secondary"
                    menuVariant="dark"
                    title=""
                    className="mt-2 userProfileContainer__dropdownBtn"
                  >
                    <NavLink
                      to="/admin/setprofile"
                      className={(el) => {
                        let activeClass =
                          el.isActive === true ? styles.active_class : "";
                        return `${styles.menu_link} ${activeClass} ${styles.menu__navbar__dropdown__link}`;
                      }}
                    >
                      <i
                        className={`${styles.menu__navbar__dropdown__link__i}  fas fa-user-edit`}
                      ></i>
                      <span className={styles.menu_span}>Change Profile</span>
                    </NavLink>
                    <NavLink
                      to="/user/dashboard"
                      className={(el) => {
                        let activeClass =
                          el.isActive === true ? styles.active_class : "";
                        return `${styles.menu_link} ${activeClass} ${styles.menu__navbar__dropdown__link}`;
                      }}
                    >
                      <i
                        className={`${styles.menu__navbar__dropdown__link__i} far fa-arrow-alt-circle-right`}
                      ></i>
                      <span className={styles.menu_span}>User Mode</span>
                    </NavLink>
                  </DropdownButton>
                </Col>
              </Col>
            </Row>
          </Container>
        </div>
        <Nav className={`${sidebarDropdown}`}>
          <ul className={`${styles.nav_menu_items}`} onClick={showSidebar}>
            <Nav.Item className={`${styles.navbar_toggle}`}>
              <NavLink
                to="#"
                className={`${styles.menu_bars} ${styles.menu_link}`}
              >
                <AiIcons.AiOutlineClose />
              </NavLink>
            </Nav.Item>
            {SidebarData.map((item, index) => {
              return (
                <Nav.Item key={index} className={styles.nav_text}>
                  <NavLink
                    to={item.path}
                    className={(el) => {
                      let activeClass =
                        el.isActive === true ? styles.active_class : "";
                      return `${styles.menu_link} ${activeClass}`;
                    }}
                  >
                    {item.icon}
                    <span className={styles.menu_span}>{item.title}</span>
                  </NavLink>
                </Nav.Item>
              );
            })}
          </ul>
        </Nav>
      </IconContext.Provider>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
