/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import axios from "axios";
let key = 0;
const Friends = () => {
  const navigate = useNavigate();
  let [friends, setFriends] = useState([]);
  const [update, setUpdate] = useState("");
  useEffect(() => {
    const userEmail = Cookies.get("userEmail");
    const token = Cookies.get("authToken");
    axios
      .get("/friends", {
        headers: {
          "X-User-Token": token,
          "X-User-Email": userEmail,
        },
      })
      .then(function (response) {
        setFriends(response.data);
        navigate("/profile");
      });
  }, []);

  const removeFriend = async (id) => {
    const current_user = JSON.parse(localStorage.getItem("userData")).id;
    const userEmail = Cookies.get("userEmail");
    const token = Cookies.get("authToken");
    await axios
      .delete("/removefriend/" + id + "/" + current_user, {
        headers: {
          "X-User-Token": token,
          "X-User-Email": userEmail,
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((err) => {
        alert("There was an error while signing out: " + err.message);
      });
    await axios
      .delete("/removefriend/" + current_user + "/" + id, {
        headers: {
          "X-User-Token": token,
          "X-User-Email": userEmail,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        alert("There was an error while signing out: " + err.message);
      });
    navigate("/profile");
  };

  // const FriendProfile = (id) => {
  //   console.log(id);
  //   navigate("/friendprofile", { id: id });
  // };

  const blockFriend = async (id) => {
    const current_user = JSON.parse(localStorage.getItem("userData")).id;
    const userEmail = Cookies.get("userEmail");
    const token = Cookies.get("authToken");

    await axios
      .patch(
        "/block/" + id + "/" + current_user,
        {},
        {
          headers: {
            "X-User-Token": token,
            "X-User-Email": userEmail,
          },
        }
      )
      .then((response) => {
        alert("User was successfully blocked.");
        window.location.reload(false);

      })
      .catch((error) => {
        alert("An error occurred while blocking the user."+ error.message)
      });
  };
  const unblockFriend = async (id) => {
    const current_user = JSON.parse(localStorage.getItem("userData")).id;
    const userEmail = Cookies.get("userEmail");
    const token = Cookies.get("authToken");

    await axios
      .patch(
        "/unblock/" + id + "/" + current_user,
        {},
        {
          headers: {
            "X-User-Token": token,
            "X-User-Email": userEmail,
          },
        }
      )
      .then((response) => {
        alert("User was successfully unblocked.");

        window.location.reload(false);
      })
      .catch((error) => {
        // Code
        alert(
          "An error occurred while unblocking the user." + error.message
        );

      });
  };

  friends = [...new Set(friends.map((a) => JSON.stringify(a)))].map((a) =>
    JSON.parse(a)
  );
  return (
    <>
      {friends.map((friend) => {
        
        return (
          <div className="container mx-5 " key={key++}>
            <ul className="list-group m-1">
              {update}
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {friend.first_name}
                <div>
                  {friend.block === 1 && (
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          unblockFriend(friend.id);
                        }}
                        className="btn btn-info m-2"
                      >
                        unblock
                      </button>
                    </div>
                  )}
                  {friend.block === 0 && (
                    <div className="btn btn-grp">
                      <button
                        type="button"
                        onClick={() => {
                          navigate("/friendprofile", {
                            state: { id: friend.id },
                          });
                        }}
                        className="btn btn-info m-2"
                      >
                        Show profile
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          blockFriend(friend.id);
                        }}
                        className="btn btn-warning m-2"
                      >
                        Block
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      removeFriend(friend.id);
                    }}
                    className="btn btn-danger m-2"
                  >
                    Remove friends
                  </button>
                </div>
              </li>
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default Friends;
