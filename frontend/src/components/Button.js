import React,{useState, useEffect} from 'react';
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import {useSelector,useDispatch} from 'react-redux';
 import {getPaginatedPost} from '../actions/actions'

function Button(props) {


    var {lastIndex, actuel_page,next,previous,startIndex}= useSelector((state) => (state.posts));
  

    const visitPage = (nr) => {
        props.setPage(nr)
    }
    const nextPage = () => {
            props.setPage(actuel_page + 1)    
    }

    const prevPage = () => {
        if (props.page > 1) {
            props.setPage(actuel_page - 1)
        }
    }
    const getButtons = () => {
        const componentlist = []
        let button_component = null
    
        for (let i = startIndex; i < lastIndex+1; i++) {
            if (i == actuel_page) {
               button_component = <button onClick={() => (visitPage(i))} className='pagination-button' >{i}</button> 
            }
            else {
                button_component = <button onClick={() => (visitPage(i))} className='pagination-button-active' >{i}</button>
            }
            componentlist.push(button_component)
        
    }
        return componentlist;
    }

    return (
        
        <div className='pagination-division'>
           {previous?<button onClick={() => (prevPage())} className='pagination-button-active' ><FiArrowLeft style={{ width: '100%', position: 'relative', height: '100%' }} /></button>:null} 
            {getButtons()}
           {next?<button onClick={() => (nextPage())} className='pagination-button-active' >< FiArrowRight style={{ width: '100%', position: 'relative', height: '100%' }} /></button>:null} 

        </div>
    )
}

export default Button
