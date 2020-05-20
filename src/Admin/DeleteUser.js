import React from 'react'
import axios from 'axios' 
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
class DeleteUser extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          deletedUserID: null
      }

    }

    handleChange = (e) => {
        this.setState({ deletedUserID: e.target.value });
      }

    
    handleDeleteUserID = () => { 
        axios.post('http://127.0.0.1:5000/deleteUser', {
            deletedUserID: this.state.deletedUserID
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
      
    }
    render() {      
        return (
        <>
        <TextField onChange = {this.handleChange} label = "Enter User ID to delete"></TextField>
        <Button onClick = {this.handleDeleteUserID}>Delete User</Button>
        </>
        )
    }
}

export default DeleteUser

