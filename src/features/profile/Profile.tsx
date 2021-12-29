import React, { FunctionComponent } from "react";
import AnimatedNumber from "react-animated-number";
import { useSelector } from "react-redux";
import { Nav, Navbar } from "react-bootstrap";
import { RootState } from "../../app/store";

const Profile: FunctionComponent = () => {
  const profile = useSelector((state: RootState) => state.profile);

  if (profile.isAuthenticated) {
    return (
      <div className="d-flex flex-row navbar-nav">
        <Navbar.Text>Scales:</Navbar.Text>
        <AnimatedNumber
          className="navbar-text px-1"
          initialValue={profile.initialBalance}
          value={profile.balance}
          duration={1500}
          stepPrecision={0}
        />
        <Navbar.Text>|</Navbar.Text>
        <Navbar.Text className="px-1">{profile.displayName}</Navbar.Text>
        <Navbar.Text>|</Navbar.Text>
        <a href="/api/logout" className="nav-link px-1">
          Logout
        </a>
      </div>
    );
  } else {
    return (
      <Nav as="ul">
        <Nav.Item as="li">
          <Nav.Link href="/api/login">Login</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
};
Profile.displayName = "Profile";
export default Profile;
