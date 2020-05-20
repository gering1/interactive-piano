import React from 'react'
import axios from 'axios' 
import DeleteUser from './DeleteUser.js'
import ExportUser from './ExportUser.js'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
class Dashboard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          
      }

    }

    render() {      
        return (
        <div>
        <DeleteUser></DeleteUser>
        <ExportUser></ExportUser>
        </div>
        )
    }
}

export default Dashboard

