import { useState, useEffect } from "react";

import "./App.css";
import Word from "./components/word";

import ListenImageURL from "./assets/images/listen.jpeg";
import ListenAudioURL from "./assets/audio/listen__gb_1.mp3";

import LearnImageURL from './assets/images/learn.jpeg'
import LearnAudioURL from "./assets/audio/learn__gb_1.mp3";

import LookImageURL from './assets/images/look.jpeg'
import LookAudioURL from "./assets/audio/look__gb_1.mp3";

import SayImageURL from './assets/images/say.avif'
import SayAudioURL from "./assets/audio/say__gb_1.mp3";

import HeadImageURL from './assets/images/head.jpeg'
import HeadAudioURL from "./assets/audio/head__gb_2.mp3";

import GirlImageURL from './assets/images/girl.avif'
import GirlAudioURL from "./assets/audio/girl__gb_2.mp3";

import IdeaImageURL from './assets/images/idea.jpeg'
import IdeaAudioURL from "./assets/audio/idea__gb_1.mp3";

//knee
import KneeImageURL from './assets/images/knee.jpeg'
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
  }
]

function App() {
  const [started, setStarted] = useState(false);

  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const timerTicker = setInterval(() => {
      if (currentWord < words.length - 1) {
        setCurrentWord(currentWord + 1);
      } else {
        clearInterval(timerTicker);
      }
    }, 13000)

    return () => {
      clearInterval(timerTicker);
    }
  }, [started, currentWord])

  return (
    <div className="App">
      {started ? (
        <Word
          word={words[currentWord].word}
          phonetic={words[currentWord].phonetic}
          meaning={words[currentWord].meaning}
          audio={words[currentWord].audio}
          image={words[currentWord].image}
        />
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
