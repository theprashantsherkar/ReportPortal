// src/DialogBox.js
import React from 'react';
import '../styles/Dialogbox.css';

const DialogBox = ({ title, children, onClose }) => {
    return (
        <div className="dialog-overlay">
            <div className="dialog-box">
                <div className="dialog-header">
                    <h2>{title}</h2>
                    <button className="close-btn" onClick={onClose}>X</button>
                </div>
                <div className="dialog-content">
                    {children}
                </div>
                <div className="dialog-footer">
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default DialogBox;
