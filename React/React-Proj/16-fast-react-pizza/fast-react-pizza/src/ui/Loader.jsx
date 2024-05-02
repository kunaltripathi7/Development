function Loader() {
  return (
    <div className="align bg-slate absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
      {/* 200/20 -> opacity , without inset it will shrink to content size -> inset -> positioning*/}
      <div className="loader"></div>
    </div>
  );
}

export default Loader;

// to make loader appear at mid -> wrap in a div stretch it -> absolute position
