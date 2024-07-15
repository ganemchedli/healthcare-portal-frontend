import React from "react";
import "./index.css";
interface UserProps {
  userData: {
    image: string;
  };
  size?: number;
}

const UserImage: React.FC<UserProps> = ({ userData }) => {
  return (
    <div className="text-center">
      <img
        src={`data:image/jpeg;base64,${userData.image}`}
        alt="User"
        className="user-image"
      />
    </div>
  );
};

export default UserImage;
