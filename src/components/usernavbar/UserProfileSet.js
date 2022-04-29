import { Fragment } from "react";
import Navbar from "./Navbar";
import ProfileSet from "../profile/ProfileSet";
function UserProfileSet() {
  return (
    <Fragment>
      <Navbar />
      <ProfileSet />
    </Fragment>
  );
}
export default UserProfileSet;
