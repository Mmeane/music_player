import { Play } from "lucide-react";
import { useEffect } from "react";
import { useAudioContext } from "../Context/AudioContext";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { useMusicContext } from "../Context/MusicContext";
import { host } from "../utils";

const MusicCard = (props) => {
  const { musicName, musicImage, musicArtist } = props;
  const {
    selectedAudio,
    playAudio,
    pauseAudio,
    isPause,
    currentIndex,
    setCurrentIndex,
    setData,
  } = useAudioContext();
  const { musicData } = useMusicContext();

  useEffect(() => {
    if (selectedAudio?.musicName === musicName) {
      setCurrentIndex(currentIndex);
    }
  }, [selectedAudio, musicName, currentIndex, setCurrentIndex]);

  const handlePlayClick = () => {
    if (selectedAudio?.musicName === musicName) {
      if (isPause) {
        playAudio(selectedAudio);
      } else {
        pauseAudio();
      }
    } else {
      playAudio({ ...props });
      setData("default");
      setCurrentIndex(
        musicData.findIndex((music) => music.musicName === musicName)
      );
    }
  };

  const isCurrentSelected = selectedAudio?.musicName === musicName;

  return (
    <>
      {/* Mobile */}

      <div className="flex hhh min-w-[270px] h-full sm:hidden flex-col justify-center items-center text-zinc-200 gap-2 font-semibold rounded-md bg-white/5 hover:bg-white/10 transition-all">
        <table className="w-full h-full">
          <tbody>
            <tr className="flex items-center">
              <td className="flex flex-row items-center justify-center gap-2">
                <div className="relative flex items-center justify-center">
                  <img
                    src={
                      musicImage
                        ? `${host + "img/" + musicImage}`
                        : "/img/download.jpeg"
                    }
                    alt="cover"
                    className="rounded-lg object-cover w-[50px] h-[50px]"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <Link to={"/music/" + musicName}>
                    <span className="text-xs max-w-[150px] whitespace-nowrap overflow-hidden overflow-ellipsis">
                      {musicName}
                    </span>
                  </Link>
                  <span className="text-[10px] text-zinc-400 max-w-[150px] whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {musicArtist}
                  </span>
                </div>
              </td>
              <td className="ml-auto w-6 flex items-center justify-center mr-2">
                <div
                  className={`playing-mobile ${
                    isCurrentSelected && !isPause ? "visible" : "invisible"
                  }`}
                >
                  <span className="playing__bar playing__bar1"></span>
                  <span className="playing__bar playing__bar2"></span>
                  <span className="playing__bar playing__bar3"></span>
                </div>
                <button
                  onClick={handlePlayClick}
                  className={`items-center justify-center mx-auto ${
                    isCurrentSelected && isPause
                      ? "flex"
                      : isCurrentSelected && !isPause
                      ? "hidden"
                      : "flex"
                  }
          `}
                >
                  <Play fill="white" color="white" size={15} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Dekstop */}
      <div
        className={` cursor-pointer
          hidden sm:flex items-center justify-center p-4 group min-w-[135px] min-h-[135px] w-[135px] sm:w-[180px] flex-col text-base text-zinc-200 gap-3 font-semibold rounded-md bg-white/5 hover:bg-white/10 transition-all`}
      >
        <div className="relative flex items-center justify-center">
          <img
            src={
              musicImage
                ? `${host + "img/" + musicImage}`
                : "/img/download.jpeg"
            }
            alt="cover"
            className="rounded-lg relative object-cover w-[105px] h-[105px] min-h-[105px] min-w-[105px] max-w-[105px] max-h-[105px] sm:min-w-[150px] sm:min-h-[150px]  sm:w-[150px] sm:h-[150px] sm:max-w-[150px] sm:max-h-[150px]"
          />
          <div
            className={`playing-ui ${
              isCurrentSelected && !isPause ? "visible" : "invisible"
            }`}
          >
            <span className="playing__bar playing__bar1"></span>
            <span className="playing__bar playing__bar2"></span>
            <span className="playing__bar playing__bar3"></span>
          </div>
          <button
            title="Play"
            aria-label="Play"
            onClick={handlePlayClick}
            className={`absolute flex items-center justify-center bottom-2 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 right-2 p-4 rounded-full bg-green-500/80 text-black button-transition hover:scale-110 hover:bg-green-500 hover:shadow-md 
          ${
            isCurrentSelected && isPause
              ? "flex group-hover:flex"
              : isCurrentSelected
              ? "group-hover:hidden pl-3.5"
              : "flex group-hover:flex"
          }
          `}
          >
            <Play fill="black" className="ml-1" />
          </button>
        </div>
        <div className="flex flex-col items-start sm:p-0">
          <Link to={"/music/" + musicName}>
            <p className="font-semibold px-2 sm:px-0 hover:underline text-[10px] sm:text-sm whitespace-nowrap overflow-hidden overflow-ellipsis w-32">
              <strong title={musicName}>{musicName}</strong>
            </p>
          </Link>
          <p className="font-normal px-2 sm:px-0 text-xs text-zinc-400 whitespace-nowrap overflow-hidden overflow-ellipsis w-32">
            {musicArtist}
          </p>
        </div>
      </div>
    </>
  );
};

MusicCard.propTypes = {
  musicName: PropTypes.string,
  musicArtist: PropTypes.string,
  musicImage: PropTypes.string,
};

export default MusicCard;
