import AddJobModal from "./components/addJobModal";
import { useState } from "react";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [jobs, setJobs] = useState({});
  const [isSelected, setIsSelected] = useState(null);

  function handleClose(e) {
    setIsOpen((isOpen) => !isOpen);
  }

  function handleAdd(obj) {}

  return (
    <div>
      <Header />
      <Main onAdd={handleClose} />
      {isOpen && (
        <AddJobModal open={isOpen} onClose={handleClose} onAdd={handleAdd} />
      )}
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <h1>JobTrackr</h1>
      <p>Career Pathway</p>
    </div>
  );
}

function Main({ onAdd }) {
  return (
    <div className=" job-blocks">
      <Wishlist onAdd={onAdd} />
      <Applied onAdd={onAdd} />
      <Interview onAdd={onAdd} />
      <Offer onAdd={onAdd} />
      <Rejected onAdd={onAdd} />
    </div>
  );
}

function Wishlist({ onAdd }) {
  return (
    <div className="job-block">
      <BlockHeader title={"Wishlist"} length={jobs.length} onAdd={onAdd} />
    </div>
  );
}

function Applied({ onAdd }) {
  return (
    <div className="job-block">
      <BlockHeader title={"Applied"} length={jobs.length} onAdd={onAdd} />
    </div>
  );
}

function Interview({ onAdd }) {
  return (
    <div className="job-block">
      <BlockHeader title={"Interview"} length={jobs.length} onAdd={onAdd} />
    </div>
  );
}

function Offer({ onAdd }) {
  return (
    <div className="job-block">
      <BlockHeader title={"Offer"} length={jobs.length} onAdd={onAdd} />
    </div>
  );
}

function Rejected({ onAdd }) {
  return (
    <div className="job-block">
      <BlockHeader title={"Rejected"} length={jobs.length} onAdd={onAdd} />
    </div>
  );
}

// Reusable Components
function BlockHeader({ title, length, onAdd }) {
  function handleAdd() {
    onAdd();
  }

  return (
    <div className="block-header">
      <h2>
        {title}
        <button className="button-close" onClick={handleAdd}>
          +
        </button>
      </h2>
      <h3>Count: {length} </h3>
    </div>
  );
}

function JobsListItem() {}
