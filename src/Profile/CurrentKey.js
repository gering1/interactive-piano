import React from 'react'
import axios from 'axios'
import './CurrentKey.css'
import Button from '@material-ui/core/Button'
import { useState } from 'react';
import Konva from 'konva';


const pianoKeys = ['AMajor', 'BMajor','CMajor','DMajor','EMajor','GMajor','G♭Major',
'D♭Major','A♭Major','E♭Major','B♭Major','FMajor',
'AMinor','EMinor','BMinor','F#Minor','C#Minor','G#Minor','D#Minor','A#Minor','FMinor',
'CMinor','GMinor','Dminor']

class CurrentKey extends React.Component {
   
    constructor(props){
        
      super(props);
      
      this.state={
      buttons: {},
      color: 'green',
      currentKeys : []
      }
      
    }
    componentDidMount() {
        let uid = sessionStorage.getItem("userID")
        axios.get(`http://127.0.0.1:5000/selectkeys/${uid}`)
          .then(res => {
            console.log(res.data)
            this.state.buttons = res.data
            this.setState({ buttons:this.state.buttons});
            console.log(this.state)
          })
          .catch(function (error) { 
              console.log(error)
          })
         
      }
    
    handleColorChange(e,key) {
        console.log(key)
    }
    handleClick = (e) => {
        console.log(e.currentTarget.style)
        console.log(e.currentTarget.value)
        if(e.currentTarget.style.background === 'red') {
            e.currentTarget.style.background = 'green'
        }
        else {
            e.currentTarget.style.background = 'red'
        }

        let uid = sessionStorage.getItem("userID")
        axios.post(`http://127.0.0.1:5000/updatekeys/${uid}`, {
            currentKeys : e.currentTarget.value
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
        
            <div >
                
            {pianoKeys.map(key=> {
                if(this.state.buttons[key] === 1){
                    /* return <Button value = {key} onClick={() => this.handleClick(key)} color= {this.state.color}>{key}</Button>
                    */
                   return <Button variant = "outlined" value = {key} onClick={this.handleClick} style = {{background : 'green'}} >{key}</Button>
                }
                else {
                    return <Button variant = "outlined"   value = {key} onClick={this.handleClick} style = {{background : 'red'}}>{key}</Button>
                }
                
            })}

            </div>
            </>
        )
    
    }
}

export default CurrentKey