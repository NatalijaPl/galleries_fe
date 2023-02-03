import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectGalleries,
  selectSearchTerm,
  selectSearchUserId,
} from "../store/galleries/selectors";
import {
  getGalleries,
  setSearchTerm,
  setSearchUserId,
} from "../store/galleries/slice";
import Button from "react-bootstrap/Button";

export const SingleAuthor = (selfId) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const galleries = useSelector(selectGalleries);
  const term = useSelector(selectSearchTerm);
  const userId = useSelector(selectSearchUserId);

  function handleChangeSearchTerm(event) {
    dispatch(setSearchTerm(event.target.value));
  }

  function handleSearch() {
    dispatch(getGalleries({ page: 1, term: term, userId: id }));
  }

  useEffect(() => {
    if (selfId) {
      dispatch(setSearchUserId(selfId));
      dispatch(getGalleries({ page: 1, term: null, userId: selfId }));
    }
    if (id) {
      dispatch(setSearchUserId(id));
      dispatch(getGalleries({ page: 1, term: null, userId: id }));
    }
    if (!id && !selfId) {
      dispatch(setSearchUserId(null));
      dispatch(getGalleries({ page: 1, term: null, userId: null }));
    }
  }, [selfId, id, dispatch]);

  function handlePaginate(page) {
    if (selfId) {
      dispatch(getGalleries({ page: page, term: term, userId: selfId }));
    }
    if (id) {
      dispatch(getGalleries({ page: page, term: term, userId: id }));
    }
    if (!id && !selfId) {
      dispatch(getGalleries({ page: page, term: term, userId: null }));
    }
  }

  return (
    <div>
      {" "}
      <div>
        <input
          className="px-3 my-2"
          type="text"
          onChange={handleChangeSearchTerm}
          placeholder="search..."
        />
        <br />
        <Button onClick={handleSearch} variant="primary">
          search
        </Button>
      </div>
      <div>
        <ul>
          {galleries &&
            galleries.data
              .filter((g) => g.user_id == id)
              .map((gallery) => (
                <div key={gallery.id}>
                  <div>title: {gallery.title}</div>
                  <div>description: {gallery.description}</div>
                  <div className="my-3">
                    <img
                      src={gallery?.images[0]?.url}
                      alt="gallery cover"
                      width="700"
                    />
                  </div>
                </div>
              ))}
        </ul>
      </div>
    </div>
  );
};
