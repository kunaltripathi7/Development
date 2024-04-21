import { useState } from "react";

export default function AddJobModal({ open, onClose, onAdd }) {
  // controlled compos
  const [firmName, setFirmName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const newObj = {
      Company: firmName,
      Position: jobTitle,
      Description: jobDesc,
      CreatedOn: new Date().toLocaleDateString(),
    };
    onAdd(newObj);
    onClose();
  }

  return (
    <div className={`"modal" ${open ? "is-active" : ""}`}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Company Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                name="companyName"
                required
                value={firmName}
                onChange={(e) => setFirmName(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Job Title</label>
            <div className="control">
              <input
                type="text"
                className="input"
                name="jobTitle"
                required
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Job Description</label>
            <div className="control">
              <textarea
                className="textarea"
                name="jobDescription"
                required
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button type="submit" className="button is-primary">
                Submit
              </button>
            </div>
            <div className="control">
              <button type="button" className="button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
      <button className="modal-close is-large" aria-label="close"></button>
    </div>
  );
}
