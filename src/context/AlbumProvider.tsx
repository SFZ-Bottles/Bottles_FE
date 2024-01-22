import { createContext, useState } from "react";
import { useQuery } from "react-query";
import AlbumApi from "../services/albumApi";

const FeedContext = createContext({
  albumData: [],
  albumId: "",
  setAlbumData: () => {},
});

interface AlbumProps {
  children: React.ReactNode;
  target: string;
}

function AlbumProvider({ children, target }: AlbumProps) {
  // const { data: albumData } = useQuery(["feedAlbum", target], () =>
  //   AlbumApi.getFeedAlbum(target, 1)
  // );
  // const [albumId, setAlbumId] = useState<string>();

  // return <FeedContext.Provider value="gg">{children}</FeedContext.Provider>;
  return <div></div>;
}

export default AlbumProvider;
