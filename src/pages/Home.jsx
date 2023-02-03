import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getGalleries,
  setSearchTerm,
  setSearchUserId,
} from "../store/galleries/slice";
import {
  selectGalleries,
  selectSearchTerm,
  selectSearchUserId,
} from "../store/galleries/selectors";
import { format } from "date-fns";

export const Home = ({ selfId, gallery } = null) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const galleries = useSelector(selectGalleries);
  const term = useSelector(selectSearchTerm);
  const userId = useSelector(selectSearchUserId);

  function handleChangeSearchTerm(event) {
    dispatch(setSearchTerm(event.target.value));
  }

  function handleSearch() {
    dispatch(getGalleries({ page: 1, term: term, userId: userId }));
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
      <h3> galleries: </h3>
      <div>
        <input
          className="px-3 my-3"
          type="text"
          onChange={handleChangeSearchTerm}
          placeholder="search..."
        />
        <br />
        <button onClick={handleSearch} className="px-4">
          search
        </button>
      </div>
      {galleries?.data.length ? (
        <div>
          <ul>
            {galleries.data.map((gallery) => (
              <div key={gallery.id}>
                <div className="my-3">
                  <img src={gallery?.images[0]?.url} alt="gallery cover" />
                </div>
                <a href={`/galleries/${gallery?.id}`}>{gallery?.title}</a>
                <p>
                  created at:{" "}
                  {format(new Date(gallery.created_at), "dd-MM-yyyy HH:mm")}
                </p>

                <div>
                  By:{" "}
                  <a href={`/authors/${gallery?.user.id}`}>
                    {gallery?.user?.first_name} {gallery?.user?.last_name}
                  </a>
                </div>
              </div>
            ))}
          </ul>
          {galleries.current_page !== galleries.last_page && (
            <button
              className="px-4 my-3"
              onClick={() => handlePaginate(galleries.current_page + 1)}
            >
              load more
            </button>
          )}
        </div>
      ) : (
        <div>no search results found</div>
      )}
    </div>
  );
};
