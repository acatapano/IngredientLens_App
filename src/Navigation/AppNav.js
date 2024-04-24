import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, Text } from 'react';

import { AuthContext } from '../AuthContext.js';
import AppStack from './AppStack.js';
import LoggedInAppStack from './LoggedInAppStack.js';

export default function AppNav() {
    const {userToken} = useContext(AuthContext);

    return (
        <NavigationContainer>
            { userToken !== null ? <LoggedInAppStack /> : <AppStack />}
        </NavigationContainer>
    );

}