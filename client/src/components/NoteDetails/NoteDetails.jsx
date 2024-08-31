import React, { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { useParams } from 'react-router-dom';
import { RxAvatar } from 'react-icons/rx';
import Spinner from '../spinner.jsx';
import Heart from 'react-animated-heart';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 16,
  },
}));

const NoteDetails = () => {
  const [isClick, setClick] = useState(false);
  const { id } = useParams();
  const [note, setNote] = useState();
  const [pdf, setPdf] = useState();
  const [favouriteLoading, setFavouriteLoading] = useState(false);

  const baseUrl = `https://class-cache-be.vercel.app/api/get-note/${id}`;

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(baseUrl);
        setNote(response.data.data);
        setPdf(response.data.data.url);
      } catch (error) {
        console.error('Error fetching note:', error);
      }
    };

    const fetchUserFavorites = async () => {
      try {
        const response = await axios.get('https://class-cache-be.vercel.app/api/userInfo', { withCredentials: true });
        if (response.data.favourites.includes(id)) {
          setClick(true);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserFavorites();
    fetchNote();
  }, [favouriteLoading]);

  const handleFavourite = async () => {
    if (favouriteLoading) return;
    setFavouriteLoading(true);

    try {
      const headers = { withCredentials: true, noteid: id };
      const response = await axios.put('https://class-cache-be.vercel.app/api/put-fav', {}, { headers });

      if (response.data.message === 'Note already favourite') {
        await axios.put(`https://class-cache-be.vercel.app/api/remove-from-fav/${id}`, {}, { headers });
        toast('Removed from favourites');
        setClick(false);
      } else {
        toast('Added to favourites <3');
        setClick(true);
      }
    } catch (error) {
      console.error('Error updating favourites:', error);
      toast('An error occurred while updating favourites');
    } finally {
      setFavouriteLoading(false);
    }
  };

  return (
    <>
      {note ? (
        <div className="flex items-center justify-center">
          <div className="flex show-below-1138 flex-col md:flex-row p-4 md:p-10">
            <div className="flex-1">
              <h1 className="underline text-center font-league text-2xl md:text-4xl break-words">{note.title}</h1>
              <iframe
                src={pdf}
                className="h-[570px] md:h-[650px] min-[1280px]:w-[800px] w-full md:w-[380px] mt-4 md:mt-0"
                allow="autoplay"
              ></iframe>
            </div>

            <div className="bg-yellow-200 p-4 rounded-lg mt-8 md:mt-0 md:ml-7 flex flex-col gap-4 w-full md:w-[350px]">
              <div className="flex items-center">
                <RxAvatar size={36} />
                <p className="mt-2 underline ml-4">by {note.author}</p>
                <div className="flex items-center ml-2 bg-yellow-100 rounded-lg p-2">
                  <FaThumbsUp className="mt-[3px]" size={24} />
                  <p text-red className="mt-[8px] text-red-500 text-xl text-bold ml-2">
                    {note.likes}
                  </p>
                </div>
              </div>

              <div className="bg-yellow-100 rounded p-2">
                <h2 className="text-lg md:text-xl underline m-0">Description</h2>
                <p className="mt-2">{note.desc}</p>
              </div>

              <div id="Heart">
                {isLoggedIn ? (
                  <LightTooltip title={isClick ? 'Remove from favourites' : 'Add to favourites'} placement="top">
                    <div className="h-[50px] md:h-[75px] text-center">
                      <Heart
                        isClick={isClick}
                        onClick={handleFavourite}
                        disabled={favouriteLoading}
                      />
                    </div>
                  </LightTooltip>
                ) : (
                  <LightTooltip title="Log in to add to your favorites!" placement="top">
                    <div className="h-[50px] md:h-[75px] text-center">
                      <Heart
                        isClick={false}
                        onClick={() => {
                          toast('Log in to add to your favorites!');
                        }}
                      />
                    </div>
                  </LightTooltip>
                )}
              </div>
              <div className="text-center mt-[15px]">
                <a href={note.download}>
                  <button
                    className="mt-2 btn-primary"
                    onClick={() => {
                      toast('✅ Download started!');
                    }}
                  >
                    Download
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default NoteDetails;
