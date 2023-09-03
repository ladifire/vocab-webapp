import { useEffect, useState } from "react";
import { useInterval } from "@restart/hooks";
import useSound from "use-sound";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import useOnChange from "./hooks/useOnChange";
import countdownSound from "./assets/analog-timer.mp3";
import correctSound from "./assets/correct.mp3";
import Word from "./components/word";
import "./App.css";

import ListenImageURL from "./assets/images/listen.jpeg";
import ListenAudioURL from "./assets/audio/listen__gb_1.mp3";

import LearnImageURL from "./assets/images/learn.jpeg";
import LearnAudioURL from "./assets/audio/learn__gb_1.mp3";

import LookImageURL from "./assets/images/look.jpeg";
import LookAudioURL from "./assets/audio/look__gb_1.mp3";

import SayImageURL from "./assets/images/say.avif";
import SayAudioURL from "./assets/audio/say__gb_1.mp3";

import HeadImageURL from "./assets/images/head.jpeg";
import HeadAudioURL from "./assets/audio/head__gb_2.mp3";

import GirlImageURL from "./assets/images/girl.avif";
import GirlAudioURL from "./assets/audio/girl__gb_2.mp3";

import IdeaImageURL from "./assets/images/idea.jpeg";
import IdeaAudioURL from "./assets/audio/idea__gb_1.mp3";

//knee
import KneeImageURL from "./assets/images/knee.jpeg";
import KneeAudioURL from "./assets/audio/knee__gb_3.mp3";

const words = [
  {
    word: "knee",
    phonetic: "niː",
    meaning: "đầu gối",
    image: KneeImageURL,
    audio: KneeAudioURL,
  },
  {
    word: "idea",
    phonetic: "aɪˈdɪə",
    meaning: "ý tưởng, sự hình dung",
    image: IdeaImageURL,
    audio: IdeaAudioURL,
  },
  {
    word: "girl",
    phonetic: "ɡɜːl",
    meaning: "con gái",
    image: GirlImageURL,
    audio: GirlAudioURL,
  },
  {
    word: "head",
    phonetic: "hed",
    meaning: "cái đầu",
    image: HeadImageURL,
    audio: HeadAudioURL,
  },
  {
    word: "listen",
    phonetic: "ˈlɪsn",
    meaning: "nghe, lắng nghe",
    image: ListenImageURL,
    audio: ListenAudioURL,
  },
  {
    word: "learn",
    phonetic: "lɜːn",
    meaning: "học, học tập",
    image: LearnImageURL,
    audio: LearnAudioURL,
  },
  {
    word: "look",
    phonetic: "lʊk",
    meaning: "nhìn, tìm kiếm",
    image: LookImageURL,
    audio: LookAudioURL,
  },
  {
    word: "say",
    phonetic: "seɪ",
    meaning: "nói",
    image: SayImageURL,
    audio: SayAudioURL,
  },
];

function App() {
  const [started, setStarted] = useState(false);
  const [startListening, setStartListening] = useState(false);

  const [currentWord, setCurrentWord] = useState(0);
  const [count, setCount] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [playCountdown, { stop: stopCountdown }] = useSound(countdownSound);
  const [playCorrectSound, { stop: stopCorrectSound }] = useSound(correctSound);

  // tries count
  const [tries, setTries] = useState(0);

  useEffect(() => {
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    stopCountdown();
    playCountdown();
    setSolved(false);
    stopCorrectSound();
  }, [currentWord, stopCountdown, playCountdown]);

  useEffect(() => {
    if (isPlaying) {
      playCountdown();
    } else {
      stopCountdown();
    }
  }, [isPlaying, playCountdown, stopCountdown]);

  const {
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition({});

  useEffect(() => {
    console.log("interimTranscript", interimTranscript);

    if (interimTranscript !== "") {
      if (interimTranscript.trim() === words[currentWord].word) {
        playCountdown();
        setIsPlaying(true);
        setStartListening(false);
        setTries(0);
      } else {
        // reTry();
      }
    }
  }, [interimTranscript, finalTranscript]);

  const [solved, setSolved] = useState(false);

  const listen = () => {
    SpeechRecognition.startListening({
      continuous: false,
      language: "en-GB",
    });
  };

  const reTry = () => {
    setStartListening(true);
    setSolved(false);
    resetTranscript();
    SpeechRecognition.stopListening();
    listen();
    setTries(tries + 1);
  }

  useOnChange(([prevSolved]) => {
    if (!prevSolved && solved) {
      playCorrectSound();
    }
  }, [solved])

  // Listen to speech listen change
  useOnChange(
    ([prevListening]) => {
      if (interimTranscript.trim() === words[currentWord].word) {
        setSolved(true);
        setTries(0);
      }

      if (prevListening && !listening) {
        if (!solved) {
          // change from listening to unlistening
          // so we need to check if is is not solved, restart listening again
          if (interimTranscript.trim() !== words[currentWord].word) {
            reTry();
          }
        }
      }
    },
    [listening, currentWord, interimTranscript, solved, tries]
  );

  useOnChange(
    ([prevStartListening]) => {
      //reset transcript for every listening round
      if (!prevStartListening && startListening) {
        resetTranscript();
        console.log("reset transcript for every listening round...");
      }
    },
    [startListening]
  );

  useInterval(
    () => {
      if (count === 2) {
        // pause to let user say the word
        stopCountdown();
        setIsPlaying(false);
        setStartListening(true);
        listen();
      }

      if (count === 13) {
        setCount(0);
        if (currentWord < words.length - 1) {
          setCurrentWord(currentWord + 1);
        } else {
          // stop all
          stopCountdown();
          setIsPlaying(false);
        }
      } else {
        setCount(count + 1);
      }
    },
    1000,
    !isPlaying
  );

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log(
      "Your browser does not support speech recognition software! Try Chrome desktop, maybe?"
    );
  }

  return (
    <div className="App">
      {started ? (
        <div style={{ position: "relative" }}>
          <Word
          solved={solved}
          tries={tries}
            listening={listening}
            finalTranscript={finalTranscript}
            interimTranscript={interimTranscript}
            count={count}
            isPlaying={isPlaying}
            word={words[currentWord].word}
            phonetic={words[currentWord].phonetic}
            meaning={words[currentWord].meaning}
            audio={words[currentWord].audio}
            image={words[currentWord].image}
            onPlayingChange={setIsPlaying}
          />
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              setStarted(true);
            }}
          >
            Start
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
