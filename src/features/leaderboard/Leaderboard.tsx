import { FunctionComponent, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { loadLeaderboard } from "./leaderboardSlice";

const Leaderboard: FunctionComponent = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState(1);
  const leaderboard = useSelector((state: RootState) => state.leaderboard);
  const fetchPage = () => {
    const pageNum = state + 1;
    dispatch(loadLeaderboard(pageNum, true));
    setState(pageNum);
  };

  useEffect(() => {
    dispatch(loadLeaderboard(1, false));
  }, [dispatch]);

  return (
    <InfiniteScroll
      loader=""
      dataLength={leaderboard.length}
      hasMore={true}
      next={fetchPage}
      scrollableTarget="content"
    >
      <table className="table w-100">
        <thead>
          <tr>
            <td>Rank</td>
            <td>Name</td>
            <td>Scales</td>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((x, i) => (
            <tr key={x.displayName + i}>
              <td>{x.rank}</td>
              <td>{x.displayName}</td>
              <td>{x.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </InfiniteScroll>
  );
};

export default Leaderboard;
