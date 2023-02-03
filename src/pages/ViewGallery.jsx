import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getGallery,
  deleteGallery,
  createComment,
  deleteComment,
} from "../store/galleries/slice";

import { selectGallery } from "../store/galleries/selectors";
import {
  selectIsAuthenticated,
  selectActiveUser,
} from "../store/auth/selector";
import { format } from "date-fns";
import { Carousel } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Button from "react-bootstrap/Button";

export const ViewGallery = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const gallery = useSelector(selectGallery);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const activeUser = useSelector(selectActiveUser);
  const [newComment, setNewComment] = useState({ body: "" });

  useEffect(() => {
    dispatch(getGallery(id));
  }, [id, dispatch]);

  const handleContentChange = (e) => {
    setNewComment({ ...newComment, body: e.target.value });
  };

  const handleAddNewComment = (e) => {
    e.preventDefault();
    dispatch(createComment({ body: newComment, galleryId: id }));
    setNewComment({ body: "" });
  };

  const handleDeleteComment = (id) => {
    dispatch(deleteComment(id));
    history.push("/galleries");
  };

  const handleDeleteGallery = () => {
    dispatch(deleteGallery(id));
    history.push("/galleries");
  };

  return (
    <div>
      <div>
        {gallery ? (
          <>
            <h1>{gallery?.title}</h1>
            <h3>
              by:{" "}
              <Link to={`/authors/${gallery?.user?.id}`}>
                {gallery?.user?.first_name} {gallery?.user?.last_name}
              </Link>
            </h3>
            <p>
              created at:{" "}
              {format(new Date(gallery.created_at), "dd-MM-yyyy HH:mm")}
            </p>
            <div>
              <Carousel>
                {gallery.images && gallery.images.length
                  ? gallery.images.map((image, index) => (
                      <Carousel.Item key={image.id} interval={7000}>
                        <a
                          key={index}
                          rel="noreferrer"
                          target="_blank"
                          href={image.url}
                        >
                          <img
                            className="d-block w-100"
                            key={image.id}
                            src={image.url}
                            alt="Gallery carousel element"
                          />
                        </a>
                      </Carousel.Item>
                    ))
                  : "no images found"}
              </Carousel>
            </div>
            <div>
              {gallery && gallery.description ? (
                <h3>{gallery.description}</h3>
              ) : (
                <p>no descripton</p>
              )}
            </div>
            {activeUser && activeUser.id === gallery.user_id ? (
              <Button variant="light">
                <Link to={`/edit-gallery/${gallery.id}`}>edit gallery</Link>
              </Button>
            ) : (
              <></>
            )}
            <br />
            <br />
            {activeUser && activeUser.id === gallery.user_id ? (
              <Button onClick={handleDeleteGallery} variant="primary">
                delete gallery
              </Button>
            ) : (
              <></>
            )}
          </>
        ) : (
          <div>loading...</div>
        )}
      </div>

      <div>
        {gallery && gallery.comments ? (
          <>
            {gallery.comments.length ? <h4>comments</h4> : <h4>no comments</h4>}
            <ul style={{ listStyleType: "none" }}>
              {gallery.comments.map((comment) => (
                <li key={comment.id} id={`comment${comment.id}`}>
                  <div>
                    {comment.user.first_name} {comment.user.last_name}
                  </div>
                  <div>
                    {format(new Date(comment.created_at), "dd-MM-yyyy HH:mm")}
                  </div>
                  <p>{comment.body}</p>
                  {activeUser && activeUser.id === comment.user.id ? (
                    <Button
                      onClick={() => handleDeleteComment(comment.id)}
                      variant="primary"
                    >
                      delete comment
                    </Button>
                  ) : (
                    <></>
                  )}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <></>
        )}
        {isAuthenticated && (
          <form onSubmit={handleAddNewComment}>
            <textarea
              required
              rows="5"
              cols="50"
              onChange={handleContentChange}
              value={newComment.body}
              placeholder="leave a comment:"
            />
            <br />
            <Button type="submit" variant="primary">
              submit comment
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
