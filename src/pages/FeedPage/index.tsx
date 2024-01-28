import { useParams } from "react-router-dom";
import AlbumApi from "../../services/albumApi";
import { useInView } from "react-intersection-observer";
import { feedTargeting } from "../../utils/feedTargetingUtils";
import React, { useEffect, useState } from "react";
import { FeedProps } from "../../components/Feed/Feed.types";
import { Feed } from "../../components/Feed/Feed";
import Loading from "../../components/Loading/Loading";

function FeedPage() {
  const params = useParams();
  const target = feedTargeting(params.id);
  const [idx, setIdx] = useState(1);
  const [ref, inView] = useInView();
  const [data, setData] = useState<FeedProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getFeed = async () => {
    setIsLoading(true);
    try {
      const result = await AlbumApi.getFeedAlbum(target, 6, idx);
      setData((prevData) => [...prevData, ...result?.data?.result]);
      setIdx((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inView && !isLoading) {
      getFeed();
    }
  }, [inView]);

  return (
    <div>
      <React.Fragment>
        <Feed data={data} />
      </React.Fragment>
      {isLoading && <Loading />}
      <div style={{ width: "100%", height: "20px" }} ref={ref} />
    </div>
  );
}

export default FeedPage;
