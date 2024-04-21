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
  const [showAddFriend, setShowAddFriend] = useState(false); // place the state where the compo is been displayed if state contains open/close func.
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((showAddFriend) => !showAddFriend);
  }

  function handleAddFriend(newFriend) {
    const newArr = [...friends, newFriend];
    setFriends(newArr);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    // think like this two sidebars need ot communicate state should be inapp and handler func passed down
    // setSelectedFriend(friend);
    setSelectedFriend((selected) =>
      selected?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    ); // new Array in state
    setSelectedFriend(null); // reuse the closing functionality already set
  }

  return (
    <div className="app">
      <div className="sidebar">
        <Friends
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <AddFriend onAddFriend={handleAddFriend} />}
        {/* Add friend window belongs to this sidebar not in friend compo -> placement*/}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <Sidebar
          selectedFriend={selectedFriend} // automatically handling sidebar closing/opening
          onSplitBill={handleSplitBill}
          key={selectedFriend.id} // for resetting the state if we go to another compo
        />
      )}
    </div>
  );
}

function Friends({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((obj) => (
        <Friend
          obj={obj}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ obj, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === obj.id; // no repeat
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={obj.image} alt="profile" />
      <h3>{obj.name}</h3>
      {obj.balance === 0 && <p>You and {obj.name} are even</p>}
      {obj.balance > 0 && (
        <p className="red">
          You owe {obj.balance} to {obj.name}
        </p>
      )}
      {obj.balance < 0 && (
        <p className="green">
          You gave {obj.balance * -1} to {obj.name}
        </p>
      )}
      <button className="button" onClick={() => onSelection(obj)}>
        {isSelected ? "Close" : "Select"}
      </button>
    </li>
  );
}

function AddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id, // builtin way of generating id (browsers func)
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);
    setImage("https://i.pravatar.cc/48"); // resetting states after submitting
    setName("");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🙍Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>📷Image Url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)} // inputs value attri is used to fetch value from option ele
      />
      <Button>Add</Button>
    </form>
  );
}

function Sidebar({ selectedFriend, onSplitBill }) {
  // visualize where the data is flowing like on splitting the bill -> the data goes back to left sidebar and account updates the balance.
  const [bill, setBill] = useState();
  const [expense, setExpense] = useState(0);
  const [payer, setPayer] = useState("");
  const calcExpense = bill > 0 ? bill - expense : 0;

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !payer) return;
    // onSplit((friends) => friends);
    // onChangeSidebar();
    onSplitBill(payer === "you" ? calcExpense : -expense);
  }

  return (
    // use form incase there is a btn and some input fields kinda thing
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split bill with {selectedFriend.name}</h2>
      <label>💲Bill Value</label>
      <input type="text" onChange={(e) => setBill(+e.target.value)} />
      <label>💲Your Expense</label>
      <input
        type="text"
        onChange={(e) =>
          setExpense(+e.target.value > bill ? 0 : +e.target.value)
        }
      />
      <label>🙍{selectedFriend.name} Expense</label>
      <input type="text" disabled value={calcExpense} />
      <label>❓Who's Paying the bill?</label>
      <select onChange={(e) => setPayer(e.target.value)}>
        <option>You?</option>
        <option>{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}

function Button({ children, onClick }) {
  // build a reusable if used multiple times
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

/*
Mistakes :
wrong way of componentisation
naming
state placement
*/
