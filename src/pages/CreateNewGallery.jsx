import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectGallery } from "../store/galleries/selectors";
import { createGallery, editGallery } from "../store/galleries/slice";
import Button from "react-bootstrap/Button";

export default function CreateNewGallery() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const retrievedGallery = useSelector(selectGallery);

  const [newGallery, setNewGallery] = useState({
    title: "",
    description: "",
    images: [],
  });

  const [newImages, setNewImages] = useState([{ url: "" }]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      if (!retrievedGallery) {
        history.push("/galleries");
        return;
      }
      dispatch(
        editGallery({
          newGallery: {
            galleryId: id,
            title: newGallery.title,
            description: newGallery.description,
            images: newGallery.images,
          },
        })
      );
      history.push(`/galleries/${retrievedGallery.id}`);
    } else {
      dispatch(createGallery(newGallery));
      history.push("/galleries");
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    if (id) {
      history.push(`/galleries/${retrievedGallery.id}`);
    } else {
      history.push("/galleries");
    }
  };

  const handleInputChange = (e, index) => {
    const list = [...newImages];
    list[index][e.target.name] = e.target.value;
    setNewImages(list);
    setNewGallery({ ...newGallery, images: newImages });
  };

  const handleAddClick = () => {
    setNewImages([...newImages, { url: "" }]);
  };

  useEffect(() => {
    setNewGallery({
      ...newGallery,
      images: newImages,
    });
  }, []);

  useEffect(() => {
    if (id) {
      setNewGallery(retrievedGallery);
      setNewImages(retrievedGallery?.images);
      if (!retrievedGallery) {
        history.push("/galleries");
        return;
      }
    }
  }, [id, history, retrievedGallery]);

  const handleRemoveClick = (index) => {
    const list = [...newImages];
    list.splice(index, 1);
    setNewImages(list);
  };

  const reorderArray = (event, originalArray) => {
    const movedItem = originalArray.find(
      (i, index) => index === event.oldIndex
    );
    const remainingItems = originalArray.filter(
      (i, index) => index !== event.oldIndex
    );

    const reorderedItems = [
      ...remainingItems.slice(0, event.newIndex),
      movedItem,
      ...remainingItems.slice(event.newIndex),
    ];

    return reorderedItems;
  };

  function changeOrder(index, direction) {
    var updatedImages = [...newImages];
    setNewImages(
      reorderArray(
        { oldIndex: index, newIndex: index + (direction === "UP" ? -1 : 1) },
        updatedImages
      )
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-3">
        <h2>{id ? "edit gallery" : "create gallery"}</h2>
        <input
          className="px-3 my-3"
          required
          type="text"
          id="title"
          placeholder="title"
          value={newGallery?.title}
          onChange={(e) =>
            setNewGallery({ ...newGallery, title: e.target.value })
          }
        />
        <br />
        <input
          className="px-3 my-3"
          as="textarea"
          cols="50"
          rows="4"
          type="text"
          id="description"
          placeholder="description"
          value={newGallery?.description}
          onChange={(e) =>
            setNewGallery({ ...newGallery, description: e.target.value })
          }
        />

        {newImages &&
          newImages.map((x, i) => {
            return (
              <div key={i}>
                <input
                  className="px-3 my-3"
                  required
                  key={i}
                  name="url"
                  value={x.url}
                  placeholder="Image url"
                  onChange={(e) => handleInputChange(e, i)}
                />
                {newImages?.length !== 1 && (
                  <Button
                    onClick={() => handleRemoveClick(i)}
                    variant="primary"
                  >
                    remove
                  </Button>
                )}
                {newImages?.length !== 1 && (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => changeOrder(i, "UP")}
                  >
                    move up
                  </Button>
                )}
                {newImages?.length !== 1 && (
                  <Button
                    type="button"
                    onClick={() => changeOrder(i, "DOWN")}
                    variant="primary"
                  >
                    move down
                  </Button>
                )}
                <div>
                  {newImages?.length - 1 === i && (
                    <Button onClick={handleAddClick} variant="primary">
                      add picture
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        <br />
        <span>
          <Button type="submit" variant="primary">
            {id ? "edit" : "submit"}
          </Button>
          <br />
          <br />
          <Button onClick={handleCancel} variant="primary">
            cancel
          </Button>
        </span>
      </form>
    </div>
  );
}
