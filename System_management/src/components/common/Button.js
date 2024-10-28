import React from 'react';
import {Button as BoostrapButton} from '@themesberg/react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {throttle} from "lodash"

export default ({onClick, ...rest}) => {
    const handelOnClick = throttle((event) => {
        if (onClick && typeof onClick === 'function') {
            onClick(event)
        }
    }, 200)
    return (
        <>
            <BoostrapButton {...rest} onClick={handelOnClick} size="sm">
                {rest.icon ? <FontAwesomeIcon icon={rest.icon} className="me-2"/> : <></>}
                {rest.children}
            </BoostrapButton>
        </>
    )
}