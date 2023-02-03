import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectGalleries } from "../store/galleries/selectors";
import { getGalleries } from "../store/galleries/slice";

export const SingleAuthor = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const galleries = useSelector(selectGalleries);
  useEffect(() => {
    dispatch(getGalleries({ userId: id }));
  }, []);
  console.log(galleries.data);
  // return galleries?.data.map((gallery) => {
  //   <div>
  //     <h1>{gallery.title}</h1>
  //     <h3>{gallery.description}</h3>
  //     {/* <img src={gallery.images[0].url} /> */}
  //   </div>;
  // });
  return (
    galleries &&
    galleries.data.map((gallery) => {
      <h1>{gallery.title}</h1>;
    })
  );
};
