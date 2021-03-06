/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import "./Post.css";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import EditPostModal from "./EditPostModal";
import { useNavigate } from "react-router-dom";
import Comments from "./Comments/Comments";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";

const Post = (props) => {
  let post_id = props.id;
  const [showEditPostModal, setShowEditPostModal] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [showCommentsAndLikes, setShowCommentsAndLikes] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [commentsUsersInfo, setCommentsUsersInfo] = useState([]);
  const [likes, setLikes] = useState([]);

  let navigate = useNavigate();

  const getPostComments = () => {
    const userToken = Cookies.get("authToken");
    const userEmail = Cookies.get("userEmail");
    const headers = {
      "X-User-Email": userEmail,
      "X-User-Token": userToken,
    };
    axios
      .get("http://localhost:3000/posts/" + post_id + "/comments", {
        headers: headers,
      })
      .then((response) => {
        setPostComments(JSON.parse(JSON.stringify(response.data)));
      })
      .catch((error) => {
        alert("Unable to fetch all posts.");
      });
  };

  const getUserInfoOfCommentsForEachPost = () => {
    const userToken = Cookies.get("authToken");
    const userEmail = Cookies.get("userEmail");
    const headers = {
      "X-User-Email": userEmail,
      "X-User-Token": userToken,
    };
    axios
      .get("http://localhost:3000/posts/" + post_id + "/comments/userinfo", {
        headers: headers,
      })
      .then((response) => {
        setCommentsUsersInfo(response.data);
      })
      .catch((error) => {
        alert(
          "Unable to fetch all user information for comments of this post  due to an error : " +
            error.message
        );
      });
  };

  const getPostLikes = () => {
    const userToken = Cookies.get("authToken");
    const userEmail = Cookies.get("userEmail");
    const headers = {
      "X-User-Email": userEmail,
      "X-User-Token": userToken,
    };
    let url = "http://localhost:3000/posts/" + post_id + "/postlikes";
    axios
      .get(url, { headers: headers })
      .then((response) => {
        // console.log(response.data);
        setLikes(response.data);
      })
      .catch((error) =>
        alert("Unable to fetch all likes due to an error: " + error.message)
      );
  };

  const createLikeOnPostHandler = (e) => {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem("userData"));
    const userToken = Cookies.get("authToken");
    const userEmail = Cookies.get("userEmail");
    const headers = {
      "X-User-Email": userEmail,
      "X-User-Token": userToken,
    };
    let url =
      "http://localhost:3000/posts/" +
      post_id +
      "/postlikes/users/createlike/" +
      currentUser.id;
    axios
      .post(url, { headers: headers })
      .then((response) => {
        if (response.data.success === false) {
          alert("you have already liked the post.");
        } else {
          alert("Liked the post successfully");
          window.location.reload();
        }
        
      })
      .catch((error) =>
        alert("Unable to create a like on the post: " + error.message)
      );
  };

  const deleteLikeOnPostHandler = (e) => {
     e.preventDefault();
     const currentUser = JSON.parse(localStorage.getItem("userData"));
     const userToken = Cookies.get("authToken");
     const userEmail = Cookies.get("userEmail");
     const headers = {
       "X-User-Email": userEmail,
       "X-User-Token": userToken,
     };
     let url =
       "http://localhost:3000/posts/" +
       post_id +
       "/postlikes/users/deletelike/" +
       currentUser.id;
     axios
       .delete(url, { headers: headers })
       .then((response) => {
         if (response.data.success === true) {
            alert("Disliked the post successfully");
            window.location.reload();
         } else {
           alert("you have already disliked the post.")
         }
        
       })
       .catch((error) =>
         alert("Unable to dislike the post: " + error.message)
       );
  }

  useEffect(() => {
    getPostComments();
    getUserInfoOfCommentsForEachPost();
    getPostLikes();
  }, [showCommentsAndLikes]);

  const DeletePostHandler = (props) => {
    let isDeleteRequested = confirm(
      "Are you sure you want to delete the post?"
    );
    if (isDeleteRequested) {
      const userToken = Cookies.get("authToken");
      const userEmail = Cookies.get("userEmail");
      const headers = {
        "X-User-Email": userEmail,
        "X-User-Token": userToken,
      };
      axios
        .delete("http://localhost:3000/posts/" + props.id, {
          headers: headers,
        })
        .then((response) => {
          alert("Post was successfully deleted.");
          window.location.reload();
        })
        .catch((error) => {
          alert("There was an error in deleting the post.");
        });
    } else {
      navigate("/profile");
      window.location.reload();
    }
  };

  return (
    <div>
      {showEditPostModal && (
        <EditPostModal
          id={props.id}
          title={props.title}
          description={props.description}
          image={props.image}
          user_id={props.user_id}
          show={show}
          setShow={setShow}
        />
      )}

      <div className=" mt-5 mb-5 space w-100 h-100">
        <div className="row d-flex align-items-center justify-content-center ">
          <div className="col-md-6 ">
            <div className="card summary">
              <div className="d-flex justify-content-between p-2 px-3">
                <div className="d-flex flex-row align-items-center">
                  <img
                    src="https://www.pinclipart.com/picdir/big/559-5594866_necktie-drawing-vector-round-avatar-user-icon-png.png"
                    width="50"
                    className="rounded-circle"
                  />
                  <div className="d-flex flex-column ml-2">
                    <strong className="font-weight-bold">
                      {props.title.toUpperCase()}
                    </strong>
                  </div>
                </div>
              </div>
              <img
                src={props.image.url}
                className="img-fluid background-image"
              />
              <div className="p-2">
                <strong className="text-justify">
                  {props.description.toUpperCase()}
                </strong>
              </div>

              {showCommentsAndLikes && (
                <div className="container">
                  <div
                    className="container text-center w-50"
                    style={{
                      marginBottom: "15px",
                      textAlign: "center",
                      border: "2px solid",
                    }}
                  >
                    <strong>Total likes on post: {likes.length} </strong>
                  </div>
                  <ButtonGroup className="container w-25" size="sm">
                    <Button
                      className="container"
                      variant="success"
                      style={{ marginRight: "5px" }}
                      onClick={(e) => {
                        createLikeOnPostHandler(e);
                      }}
                    >
                      <FaThumbsUp />
                    </Button>
                    <Button
                      className="container"
                      variant="danger"
                      onClick={(e) => {
                        deleteLikeOnPostHandler(e);
                      }}
                    >
                      <FaThumbsDown />
                    </Button>
                  </ButtonGroup>
                </div>
              )}
              <div
                className="form-check form-switch d-flex"
                style={{ margin: "15px" }}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckChecked"
                  checked={showCommentsAndLikes}
                  onChange={() =>
                    setShowCommentsAndLikes(!showCommentsAndLikes)
                  }
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckChecked"
                  style={{ marginLeft: "15px" }}
                >
                  Show Comments And Likes
                </label>
              </div>

              {showCommentsAndLikes && (
                <Comments
                  comments={postComments}
                  commentsUsersInfo={commentsUsersInfo}
                  post_id={post_id}
                  setShowCommentsAndLikes={setShowCommentsAndLikes}
                />
              )}

              <div
                className="btn-group"
                role="group"
                style={{ margin: "5px", padding: "5px" }}
              >
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ margin: "5px", padding: "5px" }}
                  onClick={() => {
                    DeletePostHandler(props);
                  }}
                >
                  Delete Post
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  style={{ margin: "5px", padding: "5px" }}
                  onClick={() => {
                    //edit post handler
                    setShowEditPostModal(true);
                    handleShow();
                  }}
                >
                  Edit Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
