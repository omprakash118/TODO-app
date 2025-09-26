import React from 'react';
import { createPortal } from 'react-dom';

const styles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}


function Model({ isOpen , onClose , children}){
    if(!isOpen) return null;
    
    return createPortal(
        <div style={styles}>
            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px'
            }}>
                {children}
                <button onClick={onClose}>Close</button>
            </div>
        </div>,
        document.body
    )
}

export default Model;