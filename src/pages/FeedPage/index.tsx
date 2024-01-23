import { useParams } from "react-router-dom";
import AlbumApi from "../../services/albumApi";
import { useInView } from "react-intersection-observer";
import { feedTargeting } from "../../utils/feedTargetingUtils";
import Feed from "../../components/Feed/Feed";
import React, { useEffect, useState } from "react";

function FeedPage() {
  const params = useParams();
  const target = feedTargeting(params.id);
  const [idx, setIdx] = useState(1);
  const [ref, inView] = useInView();
  const [data, setData] = useState<any>([]);

  const getFeed = async () => {
    const result = await AlbumApi.getFeedAlbum(target, 6, idx);
    console.log(result, "결과");
    setData([...data, ...result?.data?.result]);
    setIdx((prev: number) => prev + 1);
  };

  useEffect(() => {
    if (inView) {
      getFeed();
    }
  }, [inView]);

  return (
    <div>
      <React.Fragment>
        <Feed data={data} />
      </React.Fragment>
      <div style={{ width: "100%", height: "20px" }} ref={ref} />
    </div>
  );
}

export default FeedPage;
