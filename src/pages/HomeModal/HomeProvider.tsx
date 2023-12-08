import React, { createContext } from "react";

export interface ITemplate {
  data: string;
  species: string;
  order: number;
  content: any;
}

export interface IAlbum {
  is_private: boolean;
  num: number;
  user_id: string;
  title: string;
  preface: string;
  data: {
    pages: ITemplate[];
  };
}

// export const HomePoriver = createContext<>(null);

export const HomeProvider: React.FC = () => {
  return (
    <div></div>
    // <HomePoriver
    // // value={}>
    //     {children}
    // </HomePoriver>
  );
};
