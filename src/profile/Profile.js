import React from "react";
import ProfileUpdateForm from "./ProfileUpdateForm";
import UserFavoritesComponent from "./ProfileFavorites";

function Profile() {
  return (
    <div>
      <ProfileUpdateForm />
      <UserFavoritesComponent />
    </div>
  );
}

export default Profile;
