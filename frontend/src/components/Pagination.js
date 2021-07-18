import React, { useState, useEffect } from 'react'
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import Button from './Button';
import {useSelector,useDispatch} from 'react-redux';
 import {getPaginatedPost} from '../actions/actions'

function Pagination(props) {
   


    return (
        <div className='pagination'>
            <Button page={props.page} setPage={props.setPage} />
        </div>
    )
}

export default Pagination