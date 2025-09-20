import { useEffect, useState } from "react";
import "./style.scss";
import { usemainAlbumStore } from "../../../../store";
import Likemodal from "../../../likemodal/Likemodal";
import { usePlaylistStore } from "../../../../store/albumSlice";
import useUserStore from "../../../../store/userSlice";

const Top100MusicItem = ({ item, rank, isSelected }) => {
  const [minute, setMinute] = useState(0);
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const playlists = usePlaylistStore((state) => state.playlists);
  const addPlaylist = usePlaylistStore((state) => state.addPlaylist);
  const selectPlaylist = usePlaylistStore((state) => state.selectPlaylist);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  const MStart = usemainAlbumStore((state) => state.MStart);

  useEffect(() => {
    setMinute(Math.floor(Math.random() * 60));
  }, []);

  return (
    <>
      <tr className={isSelected ? "selected" : ""}>
        <td className="col-rank-td">{rank}</td>
        <td className="col-album-td">
          <img src={item.image} alt="" />
        </td>
        <td className="col-title-td">
          <strong>{item.title}</strong>
          <p>{item.album}</p>
        </td>
        <td className="col-artist-td">
          <p>{item.artist}</p>
        </td>
        <td className="col-time-td">3:{minute < 10 ? `0${minute}` : minute}</td>
        <td className="col-release-td">{item.release}</td>
        <td className="col-play-td icon" onClick={() => MStart(item.id, "top")}>
          <img src="/images/streaming/icon_play.png" alt="play" />
        </td>
        <td
          className="col-like-td icon"
          onClick={() => setLiked((prev) => !prev)}
        >
          <img
            src={
              liked
                ? "/images/streaming/icon_heart_on.png"
                : "/images/streaming/icon_heart.png"
            }
            alt="like"
          />
        </td>
        <td
          className="col-fav-td icon"
          onClick={() => {
            setDropdownOpen((prev) => !prev);
            setFavorited((prev) => !prev);
          }}
        >
          <img
            src={
              favorited
                ? "/images/streaming/icon_star_on.png"
                : "/images/streaming/icon_star.png"
            }
            alt="favorite"
          />
        </td>
      </tr>

      {dropdownOpen && (
        <tr className="dropdown-row">
          <td colSpan={9}>
            <Likemodal
              playlists={isLoggedIn ? playlists : []} // 로그인 여부 체크
              onSelect={(pl) => selectPlaylist(pl)} // 선택 시 store 업데이트
              onAddPlaylist={(name) => addPlaylist(name)} // 새 플레이리스트 추가
              onConfirm={() => setDropdownOpen(false)} // 모달 닫기
            />
          </td>
        </tr>
      )}
    </>
  );
};

export default Top100MusicItem;
