import stylex from "@ladifire-opensource/stylex";
import useSound from "use-sound";
import { useEffect } from "react";

import SpeakerIcon from "../../assets/images/Speaker_Icon.svg";
import PauseIcon from "../../assets/images/pause.svg";
import PlayIcon from "../../assets/images/play.svg";
// import NextIcon from "../../assets/images/next.svg";
import MicrophoneIcon from "../../assets/images/microphone.svg";
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
    overflow: "hidden",
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
    position: "relative",
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
    transition: "all 0.2s",
  },
  phonetic: {
    fontSize: "7.5rem",
    fontFamily: '"Lucida Sans Unicode", "Lucida Grande"',
    display: "table-row",
    color: "#a6e22c",
    transition: "all 0.2s",
  },
  meaning: {
    fontSize: "2.5rem",
    color: "#e7db74",
    transition: "all 0.2s",
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
    filter:
      "invert(36%) sepia(11%) saturate(107%) hue-rotate(39deg) brightness(94%) contrast(89%)",

    ":hover": {
      filter:
        "invert(100%) sepia(0%) saturate(7491%) hue-rotate(21deg) brightness(114%) contrast(100%)",
    },
  },
  controlIcons: {
    width: 46,
    height: 46,
    cursor: "pointer",
    filter:
      "invert(36%) sepia(11%) saturate(107%) hue-rotate(39deg) brightness(94%) contrast(89%)",
  },
  timeWrapper: {
    position: "absolute",
    left: 0,
    bottom: 0,
    height: 6,
    cursor: "pointer",
    background: "#d9d9d9",
    width: "100% ",
    color: "red",
  },
  bar: {
    background: "#f92472",
    height: 6,
  },
  playPause: {
    position: "absolute",
    left: 16,
    bottom: -31,
    height: 68,
    width: 68,
    cursor: "pointer",
    background: "#a3a3a1",
    color: "red",
    borderRadius: "50%",
    zIndex: 100,
    border: 'none',
    outline: 'none'
  },
  next: {
    position: "absolute",
    left: 92,
    bottom: -21,
    height: 48,
    width: 48,
    cursor: "pointer",
    background: "#a3a3a1",
    color: "red",
    borderRadius: "50%",
    zIndex: 100,
    border: 'none',
    outline: 'none'
  },
  nextIcon: {
    width: 24,
    height: 24,
  },
  microphoneContainer: {
    position: 'relative',
    height: 134,
    width: 134,
    // background: 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    animationDirection: "alternate",
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: stylex.keyframes({
        '0%': {
            boxShadow: '0 0 0 0px rgba(255, 255, 255, 0.2)'
        },
        '100%': {
            boxShadow: '0 0 0 20px rgba(255, 255, 255, 0)'
        },
    })
  },
  microphone: {
    position: 'absolute',
    height: 128,
    width: 128,
    cursor: "pointer",
    background: "#a3a3a1",
    borderRadius: "50%",
    border: 'none',
    outline: 'none'
  },
  microphoneIcon: {
    width: 96,
    height: 96,

    filter:
      "invert(36%) sepia(11%) saturate(107%) hue-rotate(39deg) brightness(94%) contrast(89%)",
  },
});

interface Props {
  isPlaying: boolean;
  count: number;
  onPlayingChange: (isPlaying: boolean) => void;
  listening: boolean;
  interimTranscript?: string;
  finalTranscript?: string;
  solved?: boolean;
  tries?: number;
}

type CombinedProps = WordProps & Props;

const Word = (props: CombinedProps) => {
  const {
    count,
    word,
    phonetic,
    meaning,
    image,
    audio,
    isPlaying,
    onPlayingChange,
    listening,
    interimTranscript,
    finalTranscript,
    solved,
    tries = 0,
  } = props;

  const [play] = useSound(audio);

  useEffect(() => {
    if (count === 3 && isPlaying) {
      play();
    }
  }, [count, isPlaying, play]);

  return (
    <div className={stylex(styles.wrapper)}>
      <div className={stylex(styles.container)}>
        <div className={stylex(styles.playWrapper)}>
          <button
            className={stylex(styles.playButton)}
            onClick={() => {
              play();
            }}
            disabled={!isPlaying}
          >
            <img alt="Play" className={stylex(styles.icon)} src={SpeakerIcon} />
          </button>
        </div>
        <div>
          <div className={stylex(styles.image)}>
            <img
              alt=""
              className={stylex(styles.wordImg)}
              src={image}
            />
            <div className={stylex(styles.timeWrapper)}>
              <div style={{ position: "relative" }}>
                <div
                  className={stylex(styles.bar)}
                  style={{ width: `${(count / 13) * 100}%` }}
                ></div>
              </div>
            </div>
            <button
              className={stylex(styles.playPause)}
              onClick={() => onPlayingChange(!isPlaying)}
              title="Next word"
            >
              <img
                alt="Play/Pause"
                className={stylex(styles.controlIcons)}
                src={isPlaying ? PauseIcon : PlayIcon}
              />
            </button>
          </div>
        </div>
        <div
          className={stylex(styles.wordContainer)}
        >
          {listening && !solved && (
            <div
              style={{
                position: "relative",
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 150,
                color: "#67d8ef",
                padding: 32,
              }}
            >
              <div className={stylex(styles.microphoneContainer)}>
              <button
                    className={stylex(styles.microphone)}
                    style={{ position: "relative", bottom: 0 }}
                    onClick={() => onPlayingChange(!isPlaying)}
                    title="Recording"
                  >
                    <img
                      alt="Recording"
                      className={stylex(styles.microphoneIcon)}
                      src={MicrophoneIcon}
                    />
                  </button>
              </div>

              <div className={stylex.dedupe({
                marginTop: '1rem',
                fontSize: "2.5rem",
                color: "red",
                transition: "all 0.2s",
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: 300
              }, interimTranscript?.trim() === word.trim() ? {
                color: '#a6e22c'
              } : {})}>
                {Boolean(interimTranscript) ? interimTranscript : (
                    <span style={{color: "#67d8ef"}}>
                        Say the word...
                    </span>
                )}
              </div>
            </div>
          )}
          {!listening && (
            <>
              <div
                className={stylex(styles.word)}
                style={
                  count >= 3 && count < 13
                    ? { opacity: 1, visibility: "visible" }
                    : { opacity: 0, visibility: "hidden" }
                }
              >
                {word}
              </div>
              <div
                className={stylex(styles.phonetic)}
                style={
                  count >= 7 && count < 13
                    ? { opacity: 1, visibility: "visible" }
                    : { opacity: 0, visibility: "hidden" }
                }
              >
                {phonetic}
              </div>
              <div
                className={stylex(styles.meaning)}
                style={
                  count >= 7 && count < 13
                    ? { opacity: 1, visibility: "visible" }
                    : { opacity: 0, visibility: "hidden" }
                }
              >
                {meaning}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Word;
