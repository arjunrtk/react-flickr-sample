import React from "react";
import LazyLoad from "react-lazyload";

function GroupCard(props) {
  let group = props.data;
  let route = `/gallery/${group.nsid}`;
  return (
    <div className="card col-3">
      <LazyLoad height={200}>
        <img src={group.iconurls.large} className="card-img-top" alt="..." />
      </LazyLoad>
      <div className="card-body">
        <h5 className="card-title">{group.name}</h5>
        <a href={route} className="btn btn-primary">
          Go To Gallery
        </a>
      </div>
    </div>
  );
}

export default GroupCard;
