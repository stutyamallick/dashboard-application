import React from 'react';

export const UserContext = React.createContext();

export const UserDefaultContext = React.createContext({
    userId: '12450'
});

export const UserPreferenceContext = React.createContext();