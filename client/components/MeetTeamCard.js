import React from 'react'

// team members
// const karen = {
//     name: "Karen Choi",
//     bio: "some info here",
//     imageURL: "image url"
// }

// const fernanda = {
//     name: "Fernanda Penfold",
//     bio: "some info here",
//     imageURL: "image url"
// }

// const brenda = {
//     name: "Brenda Wong",
//     bio: "some info here",
//     imageURL: "image url"
// }

//pass team members' information
export const MeetTeamCard = (teamMember) => {
    const {name, bio, imageURL} = teamMember;
  return (
      //add styling for card using bootstrap? tailwind?
    <div className="card-container">
        <img className="member-avatar" src={imageURL} alt={`${name}'s Profile Picture`}/>
        <h2 className="title-text-style">{name}</h2>
        <p className="subtitle-text-style">{bio}</p>
    </div>
  );
};