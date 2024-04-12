import React from "react";
import './Alert.css';

/**
* Alert: Alerts user of success or failure
*
* state: none
*
* props: messageData
*
* App -> RoutesList -> {..., Login} -> Alert
*
*/

function Alert(messageData) {
    console.log('Alert rendered')
    let successClass = null;

    messageData.success
        ? successClass = 'success'
        : successClass = 'failure';

    return (
        <div className={successClass}>
            {messageData.messageData.text.map((error, i) => {
                return <p key={i}> {error} </p>;
            })}
        </div>
    );
}

export default Alert;