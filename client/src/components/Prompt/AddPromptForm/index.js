import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alertActions';
import { addNewPrompt } from '../../../actions/promptActions';
import { Form, FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import SubmitButton from '../../Buttons/SubmitBtn';

const AddPromptForm = (props) => {
     // using the UseState hook from react
     const [formData, setFormData] = useState({
          prompt: '',
          response: '',
          uploadedBy: '',
          dateRecorded: '',
     });

     const { prompt, response, uploadedBy, dateRecorded } = formData;

     // handler to update the data
     const onChange = (event) => {
          setFormData({ ...formData, [event.target.name]: event.target.value });
     };

     const onSubmit = async (event) => {
          event.preventDefault();
          let pathArray = window.location.pathname.split('/');
          let albumId = pathArray[pathArray.length - 1];
          if (prompt === '' || response === '') {
               props.setAlert(
                    'Please include a prompt and a response in your memory submission',
                    'danger'
               );
          } else {
               try {
                    props.addNewPrompt(albumId, { prompt, response });
                    setFormData({ ...formData, prompt: '', response: '' });
               } catch (err) {}
          }
     };

     return (
          <Form className='form' onSubmit={(event) => onSubmit(event)}>
               <FormGroup>
                    <label htmlFor='prompt'>Prompt</label>
                    <input
                         type='text'
                         name='prompt'
                         className='form-control'
                         onChange={(event) => onChange(event)}
                         value={prompt}
                    />
               </FormGroup>
               <FormGroup>
                    <label htmlFor='response'>Response</label>
                    <input
                         type='text'
                         name='response'
                         className='form-control'
                         onChange={(event) => onChange(event)}
                         value={response}
                    />
               </FormGroup>
               <FormGroup>
                    <label htmlFor='uploadedBy'>Uploaded By:</label>
                    <input
                         type='text'
                         name='uploadedBy'
                         className='form-control'
                         onChange={(event) => onChange(event)}
                         value={uploadedBy}
                    />
               </FormGroup>
               <FormGroup>
                    <label htmlFor='dateRecorded'>Date Recorded:</label>
                    <input
                         type='text'
                         name='dateRecorded'
                         className='form-control'
                         onChange={(event) => onChange(event)}
                         value={dateRecorded}
                    />
               </FormGroup>

               <SubmitButton />
          </Form>
     );
};

AddPromptForm.propTypes = {
     isAuth: PropTypes.bool,
     setAlert: PropTypes.func.isRequired,
     addNewPrompt: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
     isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, addNewPrompt })(
     AddPromptForm
);