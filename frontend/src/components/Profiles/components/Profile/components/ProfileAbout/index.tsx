import React from "react";

const ProfileAbout = ({ profile }: any) => {
  const { bio, skills, user } = profile;

  return (
    <div className="profile__about bg-light p-2">
      {bio && (
        <>
          <h2 className="text-primary">
            {user?.name?.trim()?.split(" ")[0]}s Bio
          </h2>
          <p>{bio}</p>
          <div className="line" />
        </>
      )}
      <h2 className="text-primary">Skill Set</h2>
      <div className="profile__about__skills">
        {skills.map((skill: any, index: number) => (
          <div key={index} className="p-1">
            <i className="fas fa-check" /> {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileAbout;
