import React from 'react';
import circ from './circ.gif';

const Spinner=()=> {
    return (
    <div className="text-center">
        <img src={circ} alt="circ" />
    </div>
    );
}
export default Spinner;