import React from 'react'
import { NavLink } from 'react-router-dom'

interface Props {

}

const Invoices = (props: Props) => {
    return (
        <div>
            invoices table
            <NavLink to='/details'>
                go to details
            </NavLink>
        </div>
    )
}

export default Invoices
