import { useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import HomePage from "./components/homePage/HomePage";
//protect component
import AdminRoute from "./protectroutes/AdminRoute";
import PrivateRoute from "./protectroutes/PrivateRoute";
//user component
import UserDashboard from "./components/userPages/UserDahboard";
import VotingArea from "./components/userPages/VotingArea";
import Result from "./components/userPages/Result";
import VoterRegistration from "./components/userPages/VoterRegistration";
import UserProfileSet from "./components/usernavbar/UserProfileSet";

//admin component
import AdminDashboard from "./components/adminPages/AdminDashboard";
import AddCandidate from "./components/adminPages/AddCandidate";
import CandidateDetails from "./components/adminPages/CandidateDetails";
import ChangeState from "./components/adminPages/ChangeState";
import AdminProfileSet from "./components/adminnavbar/AdminProfileSet";
import ApproveVoter from "./components/adminPages/ApproveVoter";

//logout component
import Logout from "./components/logout/LogoutSpinner";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/*" element={<PrivateRoute />}>
        <Route path="logout" element={<Logout />} />
        <Route path="votingarea" element={<VotingArea />} />
        <Route path="voter/registration" element={<VoterRegistration />} />
        <Route path="result" element={<Result />} />
      </Route>
      {/* User Route Start */}
      <Route path="/user/*" element={<PrivateRoute />}>
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="setprofile" element={<UserProfileSet />} />
      </Route>
      {/* Admin Route End */}
      {/* Admin Route Start */}
      <Route path="/admin/*" element={<AdminRoute />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="setprofile" element={<AdminProfileSet />} />
      </Route>
      <Route path="/*" element={<AdminRoute />}>
        <Route path="addcandidate" element={<AddCandidate />} />
        <Route path="candidatedetails" element={<CandidateDetails />} />
        <Route path="changestate" element={<ChangeState />} />
        <Route path="approve/voter" element={<ApproveVoter />} />
      </Route>
      {/* Admin Route End */}
    </Routes>
  );
}

export default App;
