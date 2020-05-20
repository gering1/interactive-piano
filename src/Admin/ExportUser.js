import React from 'react'
import axios from 'axios' 
import fileDownload from 'js-file-download'
import DeleteUser from './DeleteUser.js'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
class ExportUser extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          file: ""
      }

    }
    handleClick = (e) => {
        axios.get('http://127.0.0.1:5000/exportUsers')
        .then(res => {
            this.setState({ file: res.data });
          
        })
        .catch(function (error) {
            console.log(error);
        })
        //console.log(this.state.file)
        console.log(this.state.file)
        fileDownload(this.state.file,'test.csv')
    }

    render() {      
        return (
        <>
        <Button onClick = {this.handleClick}>Export User List</Button>
        </>
        )
    }
}

export default ExportUser

