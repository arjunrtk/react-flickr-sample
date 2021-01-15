const axios = require("axios");
const APIURL = "https://www.flickr.com/services/rest";

const groupExtras = `extras=datecreate%2Cdate_activity%2Ceighteenplus%2Cinvitation_only%2Cneeds_interstitial%2Cnon_members_privacy%2Cpool_pending_count%2Cprivacy%2Cmember_pending_count%2Cicon_urls%2Cdate_activity_detail%2Cuse_vespa%2Cmembership_info%2Chas_pending_invite%2Csecure_rules`;
const galleryExtras = `extras=can_addmeta,can_comment,can_download,can_print,can_share,contact,count_comments,count_faves,count_views,date_taken,date_upload,description,icon_urls_deep,isfavorite,ispro,license,media,needs_interstitial,owner_name,owner_datecreate,path_alias,perm_print,realname,rotation,safety_level,secret_k,secret_h,url_sq,url_q,url_t,url_s,url_n,url_w,url_m,url_z,url_c,url_l,url_h,url_k,url_3k,url_4k,url_f,url_5k,url_6k,url_o,visibility,visibility_source,o_dims,publiceditability,system_moderation,datecreate,date_activity,eighteenplus,invitation_only,needs_interstitial,non_members_privacy,pool_pending_count,privacy,member_pending_count,icon_urls,date_activity_detail`;

export const getImages = (groupId, page = 1) =>
  axios.get(
    `${APIURL}/?method=flickr.groups.pools.getPhotos&group_id=${groupId}&per_page=20&page=${page}&api_key=${process.env.REACT_APP_APIKEY}&format=json&nojsoncallback=1&${galleryExtras}`
  );

export const searchGroups = (keyword, page = 1) =>
  axios.get(
    `${APIURL}/?method=flickr.groups.search&page=${page}&api_key=${process.env.REACT_APP_APIKEY}&text=${keyword}&format=json&nojsoncallback=1`
  );

export const getImagesInfo = (keyword, page = 1) =>
  axios.get(
    `${APIURL}/?method=flickr.groups.search&page=${page}&api_key=${process.env.REACT_APP_APIKEY}&text=${keyword}&format=json&nojsoncallback=1`
  );

export const getGroups = (keyword, page = 1) =>
  axios.get(
    `${APIURL}/?method=flickr.groups.search&page=${page}&api_key=${process.env.REACT_APP_APIKEY}&text=${keyword}&format=json&nojsoncallback=1&${groupExtras}`
  );
