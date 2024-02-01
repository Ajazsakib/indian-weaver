import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const HeaderContainer = ({ children }) =>
{
    const location = useLocation()
    return (
        <div>
            {
                location.pathname !== "/login" && children
            }
        </div>
    )
}

export default HeaderContainer
