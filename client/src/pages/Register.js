import React, { Component } from 'react';
import { Container } from 'reactstrap';

class Register extends Component {
    render() {
        return (
            // <nav class="navbar navbar-light">
            //     <h1>This is a navigation bar</h1>
            //     <p>Which will soon be turned into a react component, if you are patient</p>
            // </nav>

            <Container>
                <h5>New User</h5>
                {/* // <%- include('./partials/messages.ejs') %> */}
                    {/* <form action="/users/register" method="POST">
                        <div class="form-group">
                            <label for="fNameInput">First Name</label>
                            <input type="text" name="firstName" class="form-control" id="fNameInput" value="<%= typeof firstName != 'undefined' ? firstName : '' %>">
                        </div>
                        <div class="form-group">
                            <label for="lNameInput">Last Name</label>
                            <input type="text" name="lastName" class="form-control" id="lNameInput" value="<%= typeof lastName != 'undefined' ? lastName : '' %>">
                        </div>
                        <div class="form-group">
                            <label for="emailInput">Email</label>
                            <input type="text" name="email" class="form-control" id="emailInput" value="<%= typeof email != 'undefined' ? email : '' %>">
                        </div>
                        <div class="form-group">
                            <label for="newPasswordInput">Password</label>
                            <input type="password" name="password" class="form-control" id="newPasswordInput" value="<%= typeof password != 'undefined' ? password : '' %>">
                        </div>
                        <div class="form-group">
                            <label for="newPasswordInput">Confirm Password</label>
                            <input type="password" name="password2" class="form-control" id="newPasswordInput2" value="<%= typeof password2 != 'undefined' ? password2 : '' %>">
                        </div>
                        <button type="submit" class="btn" id="register-btn">Register</button>
                    </form> */}
                    <p class="lead mt-4">Have An Account? <a href="/users/login">Login</a></p>
            </Container>
        )
    }
}

export default Register;


