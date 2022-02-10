import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

import ClaimedIcon from "../../assets/claimed_icon.png";
import CurrentlyListedIcon from "../../assets/currently_listed_icon.png";
import EditIcon from "../../assets/edit_icon.svg.png";
import MessageIcon from "../../assets/message_icon.png";
import {
  getActiveItems,
  getClaimedItems,
  getProfile,
  getRating,
} from "../../helpers/requests";
import {
  ActiveListings,
  ClaimedItems,
  EditProfile,
  // Messages,
} from "../../components";
import "./style.css";
import defaultProfileImg from "../../assets/default-profile.png";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingActiveItems, setIsLoadingActiveItems] = useState(false);
  const [isLoadingClaimedItems, setIsLoadingClaimedItems] = useState(false);
  const [isLoadingMessages, setIsloadingMessages] = useState(false);
  const [activeFragment, setActiveFragment] = useState("");
  const [activeItems, setActiveItems] = useState([]);
  const [claimedItems, setClaimedItems] = useState([]);
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [avatarUrl, setAvatarUrl] = useState();
  const [rating, setRating] = useState();
  const [ratingCount, setRatingCount] = useState();
  const [email, setEmail] = useState();

  const isMounted = useRef(true);
  const params = useParams();
  const isCurrentUser = params.isCurrentUser;

  useEffect(() => {
    isMounted.current = true;

    if (isMounted) {
      const getProfileData = async () => {
        if (typeof window !== "undefined") {
          const name = localStorage.getItem("username");

          setIsLoading(true);
          const user = await getProfile(name);
          const fetchedRating = await getRating(name);
          setFirstName(user.first_name);
          setLastName(user.last_name);
          setUsername(user.username);
          setEmail(user.email);
          setPhoneNumber(user.phone_number);

          // check for null avatar 
          if (
            user.avatar_url === null ||
            user.avatar_url === "image/upload/null"
          ) {
            setAvatarUrl(defaultProfileImg);
          } else {
            setAvatarUrl(
              `https://res.cloudinary.com/deizaqii7/${user.avatar_url}`
            );
          }

          setRating(fetchedRating.average_rating);
          setRatingCount(fetchedRating.total);
          setIsLoading(false);
        }
      };
      getProfileData();
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    isMounted.current = true;
    if (isMounted) {
      const fetchFragmentData = async () => {
        if (typeof window !== "undefined") {
          const name = localStorage.getItem("username");
          switch (activeFragment) {
            case "":
              return;
            case "active":
              setIsLoadingActiveItems(true);
              const activeItems = await getActiveItems(name);
              //console.log(activeItems)
              setActiveItems(activeItems);
              setIsLoadingActiveItems(false);
              return;
            case "claimed":
              setIsLoadingClaimedItems(true);
              const claimedItems = await getClaimedItems(name);
              setClaimedItems(claimedItems);
              setIsLoadingClaimedItems(false);
              return;
            // case "messages":
            //   setIsloadingMessages(true);
            //   // TODO: messages
            //   // const messages = await getMessages(username)
            //   setIsloadingMessages(false);
            //   return;
            default:
              return;
          }
        }
      };
      if (activeFragment !== "edit") {
        fetchFragmentData();
      }
    }
  }, [activeFragment]);

  return (
    <div className="profile-page">
      {isLoading && <div className="loading">...loading</div>}

      {!isLoading && (
        <div className="profile-container">
          <div className="avatar-container">
            <img src={avatarUrl} alt="Profile" className="avatar-img" />
            <h1>{username}</h1>
            <div className="rating-container">
              <Rating ratingValue={rating * 20} readonly />
              <span className="ratings-text">{ratingCount} ratings</span>
            </div>
          </div>
          {activeFragment === "" && (
            <div className="profile-options-grid">
              <div
                className="options-container"
                onClick={() => setActiveFragment("messages")}
              >
                <img
                  src={MessageIcon}
                  alt="Messages"
                  className="message-icon"
                />
                <span className="profile-options-text">Messages</span>
              </div>
              <div
                className="options-container"
                onClick={() => setActiveFragment("active")}
              >
                <img
                  className="active-listings-icon"
                  src={CurrentlyListedIcon}
                  alt="Active listings"
                />
                <span className="profile-options-text">Active Listings</span>
              </div>
              {isCurrentUser === "true" && (
                // display claimed items option if profile belongs to current user
                <div
                  className="options-container"
                  onClick={() => setActiveFragment("claimed")}
                >
                  <img
                    className="claimed-items-icon"
                    src={ClaimedIcon}
                    alt="Claimed items"
                  />
                  <span className="profile-options-text">Claimed Items</span>
                </div>
              )}
              {isCurrentUser === "true" && (
                // display edit profile option if profile belongs to current user
                <div
                  className="options-container"
                  onClick={() => setActiveFragment("edit")}
                >
                  <img
                    className="edit-profile-icon"
                    src={EditIcon}
                    alt="Edit profile"
                  />
                  <span className="profile-options-text">Edit Profile</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {/* {activeFragment === "messages" && (
        <Messages
          isLoading={isLoadingMessages}
          setActiveFragment={setActiveFragment}
          messages={messages}
        />
      )} */}
      {activeFragment === "active" && (
        <ActiveListings
          isLoading={isLoadingActiveItems}
          setActiveFragment={setActiveFragment}
          activeItems={activeItems}
        />
      )}
      {activeFragment === "claimed" && (
        <ClaimedItems
          isLoading={isLoadingClaimedItems}
          setActiveFragment={setActiveFragment}
          claimedItems={claimedItems}
        />
      )}
      {activeFragment === "edit" && (
        <EditProfile
          setActiveFragment={setActiveFragment}
          email={email}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          username={username}
          setUsername={setUsername}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          avatarUrl={avatarUrl}
          setAvatarUrl={setAvatarUrl}
        />
      )}
    </div>
  );
};

export default Profile;
