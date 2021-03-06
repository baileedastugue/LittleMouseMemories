import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { getPictures, deletePicture } from '../../../actions/pictureActions';
import DeleteBtn from '../../Buttons/DeleteBtn';
import './style.css';
import PictureModal from '../PictureModal';
// import { SRLWrapper } from 'simple-react-lightbox';
// import SimpleModalSlideshow from 'react-simple-modal-slideshow';

const PictureCard = ({ picture, getPictures, deletePicture, auth }) => {
     let pathArray = window.location.pathname.split('/');
     let albumId = pathArray[pathArray.length - 1];
     let picturesLength = picture.pictures.length;
     let picturesLoading = picture.isLoading;

     useEffect(() => {
          getPictures(albumId);
     }, []);

     const deleteClick = async (event) => {
          event.preventDefault();
          const picture_id = event.target.getAttribute('data-id');
          deletePicture(picture_id, albumId);
     };

     return (
          // <SRLWrapper>
          <div>
               {picturesLength > 0 && !picturesLoading ? (
                    picture.pictures.map((picture) => (
                         <div key={picture._id}>
                              <img
                                   src={picture.image}
                                   alt={picture.caption}
                                   className='pictureCardImage SRLCustomCaption'
                              />
                              <p>{picture.caption}</p>
                              {picture.uploadedBy}
                              <br />
                              Posted on:{' '}
                              <Moment
                                   format='MM/DD/YYYY'
                                   date={picture.dateUploaded}
                              ></Moment>
                              {auth.isAuthenticated ? (
                                   <DeleteBtn
                                        id={picture._id}
                                        deleteClick={deleteClick}
                                   />
                              ) : null}
                              <PictureModal />
                         </div>
                    ))
               ) : (
                    <h1>No pictures added yet!</h1>
               )}
               {/* // </SRLWrapper> */}
          </div>
     );
};

PictureCard.propTypes = {
     getPictures: PropTypes.func.isRequired,
     deletePicture: PropTypes.func.isRequired,
     picture: PropTypes.object.isRequired,
     auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
     auth: state.auth,
     picture: state.picture,
});

export default connect(mapStateToProps, { getPictures, deletePicture })(
     PictureCard
);
