import stylex from "@ladifire-opensource/stylex";
import useSound from "use-sound";
import { useEffect, useState, useRef } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import countdownSound from "../../assets/analog-timer.mp3";
import SpeakerIcon from "../../assets/images/Speaker_Icon.svg";
import { WordProps } from "../../types";

const styles = stylex.create({
  wrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingTop: 0,
    paddingRight: "2.5rem",
    paddingLeft: "2.5rem",
    paddingBottom: "2.5rem",
  },
  container: {
    background: "#282923",
    color: "#fff",
    height: "100%",
    padding: 0,
    border: "none",
    borderRadius: "1.5rem",
    display: "table",
    position: "relative",
    transition: "all 0.2s",
  },
  image: {
    position: "relative",
    height: 400,
    width: "auto",
    borderRadius: "1.5rem 1.5rem 0 0",
  },
  wordImg: {
    width: 800,
    height: "100%",
    objectFit: "cover",
    borderTopLeftRadius: "1.5rem",
    borderTopRightRadius: "1.5rem",
  },
  wordContainer: {
    paddingTop: "0",
    paddingRight: "2.5rem",
    paddingLeft: "2.5rem",
    paddingBottom: "2.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    transition: "all 0.2s",
  },
  word: {
    fontSize: "10rem",
    display: "table-row",
    color: "#f92472",
    fontWeight: 700,
  },
  phonetic: {
    fontSize: "7.5rem",
    fontFamily: '"Lucida Sans Unicode", "Lucida Grande"',
    display: "table-row",
    color: "#a6e22c",
  },
  meaning: {
    fontSize: "2.5rem",
    color: "#e7db74",
  },
  playWrapper: {
    position: "absolute",
    left: 16,
    top: 16,
    cursor: "pointer",
    background: "none",
    zIndex: 10,
  },
  playButton: {
    background: "transparent",
    border: "none",
    scale: 0.9,

    ":hover": {
      scale: 1,
    },
  },
  icon: {
    width: 48,
    height: 48,
    cursor: "pointer",
    color: "red",
    filter:
      "invert(36%) sepia(11%) saturate(107%) hue-rotate(39deg) brightness(94%) contrast(89%)",

    ":hover": {
      filter:
        "invert(100%) sepia(0%) saturate(7491%) hue-rotate(21deg) brightness(114%) contrast(100%)",
    },
  },
  timeWrapper: {
    position: "absolute",
    left: 16,
    bottom: 16,
    cursor: "pointer",
    background: "none",
  },
  timerContent: {
    width: 80,
    height: 80,
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  timer: {
    color: "#f92472",
    fontSize: "2.5rem",
    fontWeight: 700,
  },
  timerTime: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: "translateY(0)",
    opacity: 1,
    transition: "all 0.2s",
  },
  up: {
    opacity: 0,
    transform: "translateY(-100%)",
  },
  down: {
    opacity: 0,
    transform: "translateY(100%)",
  },
});

const DURATION = 10;

const Word = (props: WordProps) => {
  const { word, phonetic, meaning, image, audio } = props;

  const [play] = useSound(audio);
  const [playCountdown, { stop }] = useSound(countdownSound);
  const [timeUp, setTimeUp] = useState(false);

  const currentTime = useRef<any>(0);
  const prevTime = useRef(null);
  const isNewTimeFirstTick = useRef(false);
  const [, setOneLastRerender] = useState(0);

  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    setTimeUp(false);
  }, [word]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      play();
    }, 3000);

    playCountdown();

    return () => {
      clearTimeout(timeout);
      stop();
    };
  }, [play, playCountdown, word, stop]);

  useEffect(() => {
    const timeTicker = setInterval(() => {
      if (count === DURATION) {
        clearInterval(timeTicker);
      }
      setCount(count + 1);
    }, 1000);

    return () => {
      clearInterval(timeTicker);
    };
  }, [count, word]);

  const renderTime = ({ remainingTime }: { remainingTime: any }) => {
    if (currentTime.current !== remainingTime) {
      isNewTimeFirstTick.current = true;
      prevTime.current = currentTime.current;
      currentTime.current = remainingTime;
    } else {
      isNewTimeFirstTick.current = false;
    }

    // force one last re-render when the time is over to tirgger the last animation
    if (remainingTime === 0) {
      setTimeout(() => {
        setOneLastRerender((val: any) => val + 1);
      }, 20);
    }

    const isTimeUp = isNewTimeFirstTick.current;

    return (
      <div className={stylex(styles.timerContent)}>
        <div
          key={remainingTime}
          // className={`time ${isTimeUp ? "up" : ""}`}
          className={`${stylex(styles.timer)} ${
            isTimeUp ? stylex(styles.up) : ""
          }`}
        >
          {remainingTime}
        </div>
        {prevTime.current !== null && (
          <div
            key={prevTime.current}
            // className={`time ${!isTimeUp ? "down" : ""}`}
            className={`${stylex(styles.timerTime)} ${
              !isTimeUp ? stylex(styles.down) : ""
            }`}
          >
            {prevTime.current}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={stylex(styles.wrapper)}>
      <div className={stylex(styles.container)}>
        <div className={stylex(styles.playWrapper)}>
          <button
            className={stylex(styles.playButton)}
            onClick={() => {
              play();
            }}
          >
            <img alt="Play" className={stylex(styles.icon)} src={SpeakerIcon} />
          </button>
        </div>
        <div>
          <div className={stylex(styles.image)}>
            <img alt="" className={stylex(styles.wordImg)} src={image} />
            <div className={stylex(styles.timeWrapper)}>
              <CountdownCircleTimer
                size={100}
                strokeWidth={8}
                isPlaying
                duration={10}
                colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                colorsTime={[10, 6, 3, 0]}
                onComplete={() => {
                  setTimeUp(true);
                  stop();

                  return {
                    shouldRepeat: true,
                    delay: 3,
                  };
                }}
              >
                {renderTime}
              </CountdownCircleTimer>
            </div>
          </div>
        </div>
        <div className={stylex(styles.wordContainer)}>
          {count >= 5 ? (
            <div className={stylex(styles.word)}>{count >= 5 ? word : ""}</div>
          ) : null}
          {count >= 3 ? (
            <div className={stylex(styles.phonetic)}>{phonetic}</div>
          ) : null}
          {timeUp ? (
            <div className={stylex(styles.meaning)}>{meaning}</div>
          ) : null}
        </div>
        <source src={audio} />
        <source src={countdownSound} />
      </div>
    </div>
  );
};

export default Word;
