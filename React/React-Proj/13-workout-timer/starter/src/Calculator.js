import { memo, useEffect, useState } from "react";
import clickSound from "./ClickSound.m4a";

function Calculator({ workouts, allowSound }) {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);
  const [duration, setDuration] = useState(0);

  // const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;
  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  //prblm -> inc duration -> state changed -> compo rerender -> new func.created (can't get it outside cuz depends on state) -> useEffect executed (after render = thatswhy u seee a flick) -> again change the state to old one cuz duration is calculated from the above 3 vals in useEffect
  // 1st try -> outside place, place in useEffect -> useCallback
  // const playSound = useCallback(
  //   function () {
  //     if (!allowSound) return;
  //     const sound = new Audio(clickSound); //audio api from browser creates an audio element on dom
  //     sound.play();
  //   },
  //   [allowSound] // this dependency will cause useEffect to run unnecessarily -> basically makes a chain to fix
  // );

  // not feasible in cases like this but can do it here cuz multiple states are dependent o/w need to do it in 4 diff places
  // downside is we will have 2 renders cuz useeffect runs way after rendering which will cause state update -> then rerender
  useEffect(
    function () {
      setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
      // playSound();
    },
    // [number, sets, speed, durationBreak, playSound]
    [number, sets, speed, durationBreak]
  );

  // What do we need? we need to play sound whenever duration changes -> need to synchronize the sound with the duration -> new useEffect which will produce a side effect. || to synchronize with some other value
  useEffect(
    function () {
      const playSound = function () {
        if (!allowSound) return;
        const sound = new Audio(clickSound);
        sound.play();
      };
      playSound();
    },
    [duration, allowSound]
  ); // put on duration voluntarily cuz I need to synchronize with that

  // Why do we need dependency arr? -> closure created on intial render which contains the snapshot of state&props at that time. -> stale closure
  useEffect(
    function () {
      console.log(duration, sets);
      document.title = `Your ${number}-exercise workout`;
    },
    [number, duration, sets]
    // [number] so when u update the duration & sets & then change number -> takes a snapshot (at that time values of duration & sets ) -> then both effect will execute after render (render due to number change) -> this useeffect has stale values of state which it will process || due to duration update from the previous useEffect compo will rerender but this time this useeffect will not run cuz no duration dependency -> if we add duration then it will run again due to change in duration which will take a snapshot of the latest value.
  );
  // useffect can't see the values in the current render so we r telling that u only need to render when number changes

  function handleInc() {
    setDuration((duration) => Math.floor(duration) + 1);
    // playSound();
  }

  function handleDec() {
    setDuration((duration) => (duration > 1 ? Math.ceil(duration) - 1 : 0));
    // playSound();
  }

  return (
    <>
      <form>
        <div>
          <label>Type of workout</label>
          <select value={number} onChange={(e) => setNumber(+e.target.value)}>
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>How many sets?</label>
          <input
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
          <span>{sets}</span>
        </div>
        <div>
          <label>How fast are you?</label>
          <input
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label>Break length</label>
          <input
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) => setDurationBreak(e.target.value)}
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button onClick={handleDec}>–</button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds}
        </p>
        <button onClick={handleInc}>+</button>
      </section>
    </>
  );
}

export default memo(Calculator);
