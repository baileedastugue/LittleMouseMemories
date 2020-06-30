import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SubmitButton from '../../Buttons/SubmitBtn';

import {
     Card,
     Col,
     Row,
     Form,
     FormGroup,
     Label,
     Input,
     //  CardBody,
     //  CardText,
     TabContent,
     TabPane,
     CardTitle,
     Button,
     Nav,
     NavItem,
     NavLink,
     //  Col,
} from 'reactstrap';
import classnames from 'classnames';
import {
     deleteAlbum,
     getAllAlbums,
     albumNameChange,
} from '../../../actions/albumActions';

import './style.css';

const AlbumSettings = ({
     albums,
     getAllAlbums,
     deleteAlbum,
     albumNameChange,
}) => {
     useEffect(() => {
          getAllAlbums();
     }, [getAllAlbums]);

     let albumLength = albums.albums.length;
     let albumLoading = albums.isLoading;

     const deleteClick = async (event) => {
          event.preventDefault();
          const album_id = event.target.getAttribute('id');
          console.log(album_id);
          deleteAlbum(album_id);
     };
     const [activeTab, setActiveTab] = useState('delete');
     const toggle = (tab) => {
          if (activeTab !== tab) setActiveTab(tab);
     };
     const deleteId = (album_id) => {
          return `delete${album_id}`;
     };

     const nameId = (album_id) => {
          return `name${album_id}`;
     };

     const passwordId = (album_id) => {
          return `password${album_id}`;
     };

     const [newTitle, setNewTitle] = useState('');

     const onAlbumTitleChange = (event) => {
          setNewTitle(event.target.value);
     };

     const submitAlbumTitle = async (event, album_id) => {
          event.preventDefault();
          await albumNameChange(album_id, { newTitle });
     };

     return albumLength === 0 ? (
          <Fragment>No albums added</Fragment>
     ) : !albumLoading ? (
          albums.albums.map((album) => (
               <Fragment>
                    <Fragment key={album._id}>
                         <Card className='albumSettings'>
                              <CardTitle>{album.title}</CardTitle>
                              <Row>
                                   <Col xs='3'>
                                        <Nav vertical>
                                             <NavItem>
                                                  <NavLink
                                                       className={classnames({
                                                            active:
                                                                 activeTab ===
                                                                 `delete${album._id}`,
                                                       })}
                                                       onClick={() => {
                                                            toggle(
                                                                 `delete${album._id}`
                                                            );
                                                       }}
                                                  >
                                                       Delete Album
                                                  </NavLink>
                                             </NavItem>
                                             <NavItem>
                                                  <NavLink
                                                       className={classnames({
                                                            active:
                                                                 activeTab ===
                                                                 `name${album._id}`,
                                                       })}
                                                       onClick={() => {
                                                            toggle(
                                                                 `name${album._id}`
                                                            );
                                                       }}
                                                  >
                                                       Album Name
                                                  </NavLink>
                                             </NavItem>
                                             <NavItem>
                                                  <NavLink
                                                       className={classnames({
                                                            active:
                                                                 activeTab ===
                                                                 `password${album._id}`,
                                                       })}
                                                       onClick={() => {
                                                            toggle(
                                                                 `password${album._id}`
                                                            );
                                                       }}
                                                  >
                                                       Album Password
                                                  </NavLink>
                                             </NavItem>
                                        </Nav>
                                   </Col>
                                   <Col xs='9'>
                                        <TabContent activeTab={activeTab}>
                                             <TabPane
                                                  tabId={deleteId(album._id)}
                                             >
                                                  <Button
                                                       id={album._id}
                                                       onClick={deleteClick}
                                                  >
                                                       Delete
                                                  </Button>
                                             </TabPane>
                                             <TabPane tabId={nameId(album._id)}>
                                                  <Form
                                                       className='form'
                                                       onSubmit={(event) =>
                                                            submitAlbumTitle(
                                                                 event,
                                                                 album._id
                                                            )
                                                       }
                                                  >
                                                       <FormGroup>
                                                            <Label htmlFor='newTitle'>
                                                                 New album title
                                                            </Label>
                                                            <Input
                                                                 type='text'
                                                                 name='newTitle'
                                                                 value={
                                                                      newTitle
                                                                 }
                                                                 onChange={
                                                                      onAlbumTitleChange
                                                                 }
                                                            />
                                                       </FormGroup>
                                                       <SubmitButton />
                                                  </Form>
                                             </TabPane>
                                             <TabPane
                                                  tabId={passwordId(album._id)}
                                             >
                                                  This is where we change the
                                                  album passwords
                                             </TabPane>
                                        </TabContent>
                                   </Col>
                              </Row>
                         </Card>
                    </Fragment>
               </Fragment>
          ))
     ) : (
          <h1>Loading your albums</h1>
     );
};

AlbumSettings.propTypes = {
     getAllAlbums: PropTypes.func.isRequired,
     deleteAlbum: PropTypes.func.isRequired,
     albumNameChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
     auth: state.auth,
     albums: state.album,
});

export default connect(mapStateToProps, {
     getAllAlbums,
     deleteAlbum,
     albumNameChange,
})(AlbumSettings);