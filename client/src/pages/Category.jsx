import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { host, category } from "./../utils";
import MusicCard from "./../components/MusicCard";
import TopNavbar from "./../components/Navbar/TopNavbar";
import LoadingBar from "react-top-loading-bar";
import SkelMusicCard from "../components/Skeleton/SkelMusicCard";

const Category = () => {
  const { year } = useParams();
  const [data, setData] = useState([]);
  const [progress, setprogress] = useState(20);
  const [compLoad, setComLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const selectedCat = category.find((cat) => cat.name === year);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${host}category/${year}`, {
        method: "GET",
      });
      const data = await res.json();
      setData(data.cat);
      setIsLoading(false);
      setComLoad(false);
    };
    setprogress(100);
    setTimeout(() => {
      fetchData();
    }, 200);
  }, [year]);

  return (
    <>
      <div
        className={`mx-auto bg-gradient-to-b ${selectedCat.from} ${selectedCat.to}  px-6 pt-6 pb-14  `}
      >
        <TopNavbar />
        <div className="flex flex-row items-center justify-between mt-12">
          <h1 className="text-7xl font-semibold text-zinc-50">
            Music tahun {year}!
          </h1>
        </div>
      </div>
      <div
        className={`grid bg-gradient-to-b ${selectedCat.re} ${selectedCat.to} h-full xl:grid-cols-5 2xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 py-12 px-4
        `}
      >
        {compLoad ? (
          <LoadingBar color="#00a827" shadow={true} progress={progress} />
        ) : isLoading ? (
          Array.from({ length: 6 }, (_, index) => <SkelMusicCard key={index} />)
        ) : data.length === 0 ? (
          <h1>No Musics Found.</h1>
        ) : (
          data.map((music, index) => (
            <div key={index}>
              <MusicCard
                musicName={music.musicName}
                musicPath={music.musicPath}
                musicArtist={music.musicArtist}
                musicImage={music.musicImage}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Category;