import React from "react";
import isEmpty from "../../validation/isEmpty";
import { Link } from "react-router-dom";

const ProfileItems = props => {
  const { profile } = props;
  return (
    <div class="card card-body bg-light mb-3">
      <div class="row">
        <div class="col-2">
          <img
            class="rounded-circle"
            src={profile.user.avatar}
            alt="ProfileImage"
          />
        </div>
        <div class="col-lg-6 col-md-4 col-8">
          <h3>{profile.user.name}</h3>
          <p>
            {" "}
            {profile.status}{" "}
            {isEmpty(profile.company) ? null : (
              <span>at {profile.company}</span>
            )}
          </p>
          <p>
            {isEmpty(profile.location) ? null : <span>{profile.location}</span>}
          </p>
          <Link to={`/profile/${profile.handle}`} class="btn btn-info">
            View Profile
          </Link>
        </div>
        <div class="col-md-4 d-none d-lg-block">
          <h4>Skill Set</h4>
          <ul class="list-group">
            {profile.skills.slice(0, 4).map((skill, index) => {
              return (
                <li class="list-group-item" key={index}>
                  <i class="fa fa-check pr-1" />
                  {skill}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileItems;
