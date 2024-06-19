import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TwoFactorAuthentication = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [qrCode, setQrCode] = useState('');
    const [recoveryCodes, setRecoveryCodes] = useState([]);

    useEffect(() => {
        // Fetch 2FA status and details
        axios.get('/user/two-factor-authentication')
            .then(response => {
                setIsEnabled(response.data.enabled);
                setQrCode(response.data.qrCode);
                setRecoveryCodes(response.data.recoveryCodes);
            });
    }, []);

    const enable2FA = () => {
        axios.post('/user/two-factor-authentication')
            .then(response => {
                setIsEnabled(true);
                setQrCode(response.data.qrCode);
                setRecoveryCodes(response.data.recoveryCodes);
            });
    };

    const disable2FA = () => {
        axios.delete('/user/two-factor-authentication')
            .then(response => {
                setIsEnabled(false);
                setQrCode('');
                setRecoveryCodes([]);
            });
    };

    return (
        <div>
            <h2>Two-Factor Authentication</h2>
            {isEnabled ? (
                <div>
                    <p>Two-factor authentication is enabled.</p>
                    <button onClick={disable2FA}>Disable 2FA</button>
                    <div>
                        <h3>QR Code</h3>
                        <img src={qrCode} alt="QR Code" />
                    </div>
                    <div>
                        <h3>Recovery Codes</h3>
                        <ul>
                            {recoveryCodes.map(code => <li key={code}>{code}</li>)}
                        </ul>
                    </div>
                </div>
            ) : (
                <div>
                    <p>Two-factor authentication is not enabled.</p>
                    <button onClick={enable2FA}>Enable 2FA</button>
                </div>
            )}
        </div>
    );
};

export default TwoFactorAuthentication;
