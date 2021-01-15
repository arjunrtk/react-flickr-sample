import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Masonry from "react-masonry-component";
import { masonryOptions } from "./exports";
import { getImages } from "./request";
import { useParams } from "react-router-dom";
import LazyLoad from "react-lazyload";
import "./GalleryPage.css";

function GalleryPage() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const groupId = useParams().id;

  const getMoreImages = () => {
    if (loading) {
      setLoading(false);
      setPage(page + 1);
      console.log(page);
      getImages(groupId, page)
        .then((r) => r.data)
        .then((response) => {
          const imgs = images.concat(response.photos.photo);
          setImages(imgs);
          setLoading(true);
        });
    }
  };

  useEffect(() => {
    let loading = true;
    if (loading) {
      let pg = page;
      getImages(groupId, pg)
        .then((r) => r.data)
        .then((response) => {
          const imgs = images.concat(response.photos.photo);
          setImages(imgs);
          setTotal(response.photos.total);
        });
      loading = false;
    }
  }, []);

  return (
    <div className="page">
      <a href="/" className="float">
        <i className="my-float">⇚</i>
      </a>
      <InfiniteScroll
        pageStart={1}
        loadMore={getMoreImages}
        hasMore={total > images.length}
      >
        <Masonry
          className={"grid"}
          elementType={"div"}
          options={masonryOptions}
          disableImagesLoaded={false}
          updateOnEachImageLoad={false}
        >
          {images.map((img, i) => {
            return (
              <div key={i} className="details-wrapper">
                <span className="image-name hide">{img.title}</span>
                <LazyLoad height={200}>
                  <img src={img.url_c}  alt="img"/>
                </LazyLoad>
                  <span className="image-owner hide">By {img.ownername}</span>
                  {/* <div className="image-desc hide">{img.description._content}</div> */}
              </div>
            );
          })}
        </Masonry>
      </InfiniteScroll>
    </div>
  );
}
export default GalleryPage;
