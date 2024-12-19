import { useState } from "react";

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
  const [selectedFriend, setSelectedFriend] = useState("");
  const [whoPaying, setWhoPaying] = useState("");
  const [open, setOpen] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [balance, setBalance] = useState(0);

  return (
    <div className="app">
      <div className="sidebar">
        <Friends
          friends={friends}
          open={open}
          onSetOpen={setOpen}
          onSelectFriend={setSelectedFriend}
          balance={balance}
          onSetBalance={setBalance}
        />
        <AddFriends
          open={open}
          onSetOpen={setOpen}
          friends={friends}
          onSetFriends={setFriends}
        />
      </div>
      <SplitBill
        whoPaying={whoPaying}
        onWhoPaying={setWhoPaying}
        selectedFriend={selectedFriend}
        friends={friends}
        balance={balance}
        onSetBalance={setBalance}
      />
    </div>
  );
}
function Friends({
  friends,
  open,
  onSetOpen,
  onSelectFriend,
  balance,
  onSetBalance,
}) {
  function handleAdd(e) {
    e.preventDefault();
    onSetOpen(!open);
  }
  // console.log(friends);
  return (
    <>
      <div>
        <ul>
          {friends.map((friend) => (
            <Friend
              friend={friend}
              onSelectFriend={onSelectFriend}
              key={friend.id}
              balance={balance}
              onSetBalance={onSetBalance}
            />
          ))}
        </ul>
      </div>
      <button onClick={(e) => handleAdd(e)} className="button">
        Add friend
      </button>
    </>
  );
}
function Friend({ onSelectFriend, friend, balance, onSetBalance }) {
  const [selected, setSelected] = useState(false);
  function handleSelect(e, selectedFriend) {
    e.preventDefault();
    onSelectFriend(selectedFriend);
    setSelected(!selected);
  }
  onSetBalance(friend.balance);
  let balanceText, className;
  if (balance === 0) balanceText = `You and ${friend.name} are even`;
  else if (balance < 0) {
    balanceText = `You owe ${friend.name} ${Math.abs(balance)}€`;
    className = "green";
  } else {
    balanceText = `${friend.name} owes you ${balance}€`;
    className = "red";
  }
  return (
    <li className={selected ? "selected" : ""}>
      <img src={friend.image} alt="avatar"></img>
      <div>
        <h3>{friend.name}</h3>
        <p style={{ color: className }}>{balanceText}</p>
      </div>
      <button onClick={(e) => handleSelect(e, friend.name)} className="button">
        {selected ? "Close" : "Select"}
      </button>
    </li>
  );
}
function AddFriends({ open, onSetOpen, friends, onSetFriends }) {
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const addedFriend = {
    name,
    image: "https://i.pravatar.cc/300",
    id: Math.floor(Math.random() * 101),
    balance: 0,
  };
  //
  function handleAdd(e) {
    e.preventDefault();
    onSetFriends([...friends, addedFriend]);
    setName("");
    setImageURL("");
  }
  return (
    <>
      <form
        style={{ display: open ? "" : "none" }}
        className="form-add-friend "
      >
        <label>👭 Friend name</label>
        <input
          placeholder="friend name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <label>🌄 Image URL</label>
        <input
          placeholder="Image URL"
          value={"https://i.pravatar.cc/300"}
        ></input>
        <button onClick={(e) => handleAdd(e)} className="button">
          Add
        </button>
      </form>
      <button
        style={{ display: open ? "" : "none" }}
        onClick={() => onSetOpen(!open)}
        className="button"
      >
        Close
      </button>
    </>
  );
}

function SplitBill({
  whoPaying,
  onWhoPaying,
  selectedFriend,
  friends,
  balance,
  onSetBalance,
}) {
  const [bill, setBill] = useState("");
  const [MyExpense, setMyExpense] = useState("");
  const [friendExpense, setFriendExpense] = useState("");
  function handelSplit(e) {
    e.preventDefault();
    const [selectedFriendData] = friends.filter(
      (friend) => friend.name === selectedFriend
    );
    onSetBalance(selectedFriendData.balance);
    if (whoPaying === "You") onSetBalance(balance + friendExpense);
    console.log(friendExpense * 1);
  }

  return (
    <form className="form-split-bill ">
      <h2>split a bill with SARAH</h2>
      <label>💰 Bill value</label>
      <input
        placeholder="bill value"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      ></input>
      <label>🧍‍♀️ Your expense</label>
      <input
        type="number"
        placeholder="expense value"
        value={MyExpense}
        onChange={(e) => setMyExpense(Number(e.target.value))}
        onSubmit={(e) => setMyExpense(Number(e.target.value))}
      ></input>
      <label>👭 {selectedFriend}'s expense</label>
      <input
        type="number"
        placeholder="expense value"
        value={MyExpense && bill ? bill - MyExpense : friendExpense}
        onChange={(e) => setFriendExpense(Number(e.target.value))}
        onSubmit={(e) => setFriendExpense(Number(e.target.value))}
      ></input>
      <label>🤑 Who is paying the bill?</label>
      <select
        placeholder="bill value"
        value={whoPaying}
        onChange={(e) => onWhoPaying(e.target.value)}
      >
        <option>You</option>
        <option>{selectedFriend}</option>
      </select>
      <button onClick={(e) => handelSplit(e)} className="button">
        Split bill
      </button>
    </form>
  );
}
