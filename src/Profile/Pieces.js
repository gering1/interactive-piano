import React from 'react';
import Typography from '@material-ui/core/Typography'
import Input from '@material-ui/core/Input'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from "@material-ui/core/Paper";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
const styles = (theme) => ({
  wrapper: {
    width: 800
  },
  entry: {
    marginTop: 100
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
})
class Pieces extends React.Component {
    constructor(props){  
        super(props);    
        this.state={
          piece : "",
          composer :"",
          status:"",
          pieces :[]

        }   
      }
      componentDidMount = () => {
        let uid = sessionStorage.getItem("userID")
        axios.get(`http://127.0.0.1:5000/selectPieces/${uid}`)
        .then(res => {
          for(var i = 0;i < res.data.length;i++) {
              this.state.piece = res.data[i][0]
              this.state.composer = res.data[i][1]
              this.state.status = res.data[i][2]
              this.setState({
                piece: this.state.piece,
                composer: this.state.composer,
                status:this.state.status
              })
              this.addPieceInfo()
          }
          console.log(res.data)
          //this.setState({ pieces:res.data});
        })
        .catch(function (error) { 
            console.log(error)
        })
        this.setState({
            _mounted:true
        })
      }
     handleComposerChange = (e) => {
         this.setState({
             composer: e.target.value
         })
     }
     handlePieceChange = (e) => {
         this.setState({
             piece:e.target.value
         })
     }
     handleStatusChange = (e) => {
        this.setState({
            status:e.target.value
        })
    }
    postAndAdd = () => {
        this.postPieceInfo()
        this.addPieceInfo()
    }
    postPieceInfo = () => {
        axios.post('http://127.0.0.1:5000/insertPieces', {
            userID: 1,
            piece: this.state.piece,
            composer: this.state.composer,
            status: this.state.status

        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
      addPieceInfo = () => {
       
          const newItem = {
              piece: this.state.piece,
              composer:this.state.composer,
              status:this.state.status
          }
          console.log(newItem)
          const pieces = [...this.state.pieces]
          pieces.push(newItem)

          console.log(pieces)
          this.setState({
              pieces:pieces,
              piece: "",
              composer:"",
              status:""
          })
      }
      deletePiece(){
          const pieces = [...this.state.pieces]
          const filteredList = pieces.filter
      }
        
      
      render() {
        const {classes} = this.props;
          return (
              <>
        <div className = {classes.wrapper}>
        <TableContainer>
        <Table className = {classes.table}>
        <TableHead className = {classes.head}>
          <TableRow>
            <TableCell>Piece</TableCell>
            <TableCell align="right">Composer</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.pieces.map(row => (
            <TableRow key={row.piece}>
              <TableCell component="th" scope="row">
                {row.piece}
              </TableCell>
              <TableCell align="right">{row.composer}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
        </TableContainer>
        
              <div className = {classes.entry}>
                  <Input
                  type="text"
                  placeholder="Enter piece"
                  onChange = {this.handlePieceChange}
                  ></Input>
                  <Input
                  type = "text"
                  placeholder = "Enter Composer"
                  onChange = {this.handleComposerChange}></Input>
                   <Input
                  type = "text"
                  placeholder = "Enter Status"
                  onChange = {this.handleStatusChange}></Input>
                  <Button
                  variant = "contained"
                  color = "primary"
                  onClick = {this.postAndAdd}
                  >
                    Add Piece
                </Button>
            
              </div >
              </div>
              </>
          )
      }
}


Pieces.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(Pieces)
  
  