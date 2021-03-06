import { useState } from "react";

const AllFriend = (props) => {
  const [friendRequest, setFriendRequest] = useState(false);
  console.log("all friend",props.friends)

  return (
    <>
      {props.friends.map((friend) => {
        return (
          <div className="container mx-5 " key={friend.id}>
            <ul className="list-group m-1">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {friend.first_name}
                <button
                  type="button"
                  onClick={() => {
                    props.friendRequestHandler(friend.id)
                    setFriendRequest(!friendRequest)
                  }}
                  className="btn btn-info"
                >
                  Add friend
                </button>
              </li>
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default AllFriend;
