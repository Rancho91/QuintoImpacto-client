import React from 'react'

export default function NavLink(props){
  return(
    <li className='nav-link'><a href={props.href} className={props.font}>{props.text}</a></li>
  )
}