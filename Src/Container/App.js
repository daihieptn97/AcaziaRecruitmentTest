/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StatusBar} from 'react-native';
import Api, {getPersonApi} from '../Common/Api';
import Tinder from '../Component/Tinder';
import BackgroundMain from '../Component/BackgroundMain';
import Colors from '../Theme/Colors';

export default function () {
    const [person, setPerson] = useState(null);

    async function getUser() {
        try {
            const response = await Api.get(getPersonApi);
            console.log(response);
            setPerson(response.results[0].user);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!person) {
            getUser();
        }
    }, []);

    return <View>
        <StatusBar backgroundColor={Colors.transparent} barStyle={'light-content'}/>
        <BackgroundMain>
            <Tinder user={person}/>
        </BackgroundMain>
    </View>;
}
