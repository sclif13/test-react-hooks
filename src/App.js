import * as React from "react";
import "./App.css";
import Button from "./Button";
import TextArea from "./TextArea";

const useQueue = () => {
  const [log, setLog] = React.useState("");
  const [queue, setQueue] = React.useState([]);
  const [timer, setTimer] = React.useState(null);

  const process = React.useCallback(() => {
    if (queue && queue.length && !timer) {
      const q = queue[0];
      const newTimer = setTimeout(() => {
        setTimer(null);
        setLog(
          (log) =>
            log +
            `${new Date().toLocaleTimeString()} :  ${
              q.timeout
            }  : ${q.time.toLocaleTimeString()}\n`
        );
        setQueue(([_, ...other]) => other);
      }, q.timeout * 1000);
      setTimer(newTimer);
    }
  }, [queue, timer]);

  const handleClear = React.useCallback(() => {
    setQueue(() => []);
    setLog("");
    setTimer((timer) => {
      clearTimeout(timer);
      return null;
    });
  }, []);

  const handleClick = React.useCallback((e) => {
    const { name } = e.target;
    setQueue((queue) => [...queue, { time: new Date(), timeout: name }]);
  }, []);

  React.useEffect(() => {
    process();
  }, [queue]);

  return [log, handleClear, handleClick];
};

export default function App() {
  const [log, handleClear, handleClick] = useQueue();

  return React.useMemo(
    () => (
      <div className="App">
        <div>
          <Button name={1} handleClick={handleClick} />
          <Button name={2} handleClick={handleClick} />
          <Button name={3} handleClick={handleClick} />
          <Button name={"Сбросить"} handleClick={handleClear} />
        </div>
        <TextArea log={log} />
      </div>
    ),
    [log, handleClear, handleClick]
  );
}
