import React from 'react';
import FirstLogin from './Login/FirstLogin.js';
import Sidebar from './Sidebar/Sidebar.js';

const FirstStaffLoginPage = () => {
    return (
        <div>
            {
                (localStorage.getItem("firstLogin") === "true") ?
                    <FirstLogin />
                    : <Sidebar />
            }
        </div>
    )
}
export default FirstStaffLoginPage;