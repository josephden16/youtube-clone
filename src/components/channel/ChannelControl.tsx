import { Switch, Route, useRouteMatch } from "react-router-dom";
import Home from "./Home";
import Videos from "../channel/Videos";

export default function ChannelControl({ match, channelData, channelId, loading, channelVideos }) {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route
        path={`${match.url}/videos`}
        render={() => (
          <Videos
            channelName={channelData?.channelName}
            id={channelId}
            videos={channelVideos}
            loading={loading}
          />
        )}
      />
      <Route
        exact
        path={path}
        render={() => (
          <Home
            channelData={channelData}
            videos={channelVideos}
            loading={loading}
          />
        )}
      />
    </Switch>
  );
}
