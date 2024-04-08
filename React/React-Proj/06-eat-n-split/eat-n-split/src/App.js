import { useState } from "react";
// In a typical React application, when you import a CSS file in the main entry point (such as index.js), the styles are applied globally throughout the application by default.
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  return (
    <div className="app">
      <Friends />
    </div>
  );
}

function Friends() {
  const [friends, SetNewFriend] = useState([...initialFriends]);
  function handleAddFriend(name, imageUrl) {
    const newFriend = {
      id: imageUrl.substring(imageUrl.indexOf("=") + 1),
      name,
      image: imageUrl,
      balance: 0,
    };
    const newArr = [...friends, newFriend];
    SetNewFriend(newArr);
  }
  return (
    <div>
      {friends.map((f) => {
        if (f.balance > 0)
          return (
            <Friend obj={f}>
              `{f.name} owes you ${f.balance}`
            </Friend>
          );
        else if (f.balance === 0)
          return <Friend obj={f}>`You and {f.name} are even`</Friend>;
        else
          return (
            <Friend obj={f}>
              `You Owe {f.name} ${f.balance}`
            </Friend>
          );
      })}
      <AddFriend onAdd={handleAddFriend} />
    </div>
  );
}

function Friend({ obj, children }) {
  return (
    <div>
      <img src={obj.image} alt="profile-picture" />
      <div>
        <h3>{obj.identity}</h3>
        {children}
      </div>
      {/* <button className="button">Select</button> */}
    </div>
  );
}

function AddFriend({ onAdd }) {
  const [open, SetOpen] = useState(false);
  function handleClick() {
    SetOpen((open) => !open);
  }
  return (
    <div>
      {open && <AddFriendInfo onAdd={onAdd} />}
      <button className="button" onClick={handleClick}>
        {!open ? `Add Friend` : "Close"}
      </button>
    </div>
  );
}

function AddFriendInfo({ onAdd }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=933372");
  return (
    <div>
      <p>Friend Name</p>{" "}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Image Url</p>{" "}
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button className="button" onClick={() => onAdd(name, image)}>
        Add
      </button>
    </div>
  );
}

function Sidebar({ friend }) {
  return (
    <div className="sidebar">
      <h3>Split bill with {friend.name}</h3>
      <form>
        <label>Bill Value</label> <input type="text" />
        <label>Your Expense</label> <input type="text" />
        <label>{friend.name} Expense</label> <input type="text" />
        <label>Who's Paying the bill?</label>{" "}
        <select>
          <option>You?</option>
          <option>{friend.name}</option>
        </select>
        <button>Split Bill</button>
      </form>
    </div>
  );
}
