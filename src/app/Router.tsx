import React, { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import BigScreen from "../layouts/BigScreen";
import Popout from "../layouts/Popout";
import BettingAdmin from "../features/betting/BettingAdmin";
import Leaderboard from "../features/leaderboard/Leaderboard";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import NotFound from "../common/notFound";
import Login from "../common/login";

const Router: FunctionComponent = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const authenticated = profile.isAuthenticated;
  const isModerator = profile.roles && profile.roles.includes("moderator");

  return (
    <Routes>
      <Route path="/" element={<BigScreen />}>
        <Route path="*" element={<NotFound />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        {isModerator ? <Route path="betAdmin" element={<BettingAdmin />} /> : ""}
      </Route>
      <Route path="/popout" element={<Popout />}>
        {authenticated ? <Route path="*" element={<NotFound />} /> : <Route path="*" element={<div className="text-center"><Login /></div>} />}
        {isModerator ? <Route path="betAdmin" element={<BettingAdmin />} /> : ""}
      </Route>
    </Routes>
  );
};

export default Router;
