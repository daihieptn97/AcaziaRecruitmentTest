/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {AppState, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import Api, {getPersonApi} from '../Common/Api';
import Tinder from '../Component/Tinder/Tinder';
import BackgroundMain from '../Component/BackgroundMain';
import Colors from '../Theme/Colors';
import _ from 'lodash';
import Carousel from 'react-native-snap-carousel';
import Toast from '../Component/Toast';
import {getFavourite, saveDataFavourite, WIDTH_SCREEN} from '../Common/base';
import NetInfo from '@react-native-community/netinfo';

let arrTemp = [];

let initTimes = 3;
export default function () {
    const [persons, setPersons] = useState([]);
    const [index, setIndex] = useState(0);
    const [favourites, setFavourites] = useState(null);
    const [isConnected, setConnected] = useState(false);

    async function getUser() {
        try {
            const response = await Api.get(getPersonApi);
            console.log(response);
            if (response && response.results) {
                arrTemp = _.concat(arrTemp, response.results[0].user);
                setPersons(arrTemp);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function doGetFavourites() {
        let data = await getFavourite();
        console.log(data);
        setFavourites(data);
        if (!isConnected) {
            setPersons(data);
        }
    }

    const handleChangeAppState = (newState) => {
        try {
            if (newState === 'active') {
                NetInfo.addEventListener(state => {
                    console.log('Is connected?', state.isConnected);

                    if (state.isConnected) {
                        if (!persons || persons.length <= 0) {
                            getUser();
                            getUser();
                            getUser();
                        }
                        setConnected(true);
                    } else {
                        setConnected(false);
                    }
                });
            }
        } catch (e) {
            console.log('handleChangeAppState', e);
        }
    };

    useEffect(() => {
        AppState.addEventListener('change', handleChangeAppState);
        return () => {
            AppState.removeEventListener('change', handleChangeAppState);
        };

        doGetFavourites();
    }, []);

    const _renderItem = ({item, index}) => {
        return <Tinder user={item}/>;
    };

    const doSnap = (position) => {
        if (isConnected) {
            getUser();
        }
        console.log(position, index);
        setIndex(position);
        if (position < index && !persons[position].favourite) {
            Toast.default('Save' + persons[position].phone);
            arrTemp[position].favourite = true;
            setPersons(arrTemp);

            let faTemp = favourites ? favourites : [];
            faTemp.push(persons[position]);
            setFavourites(faTemp);
            saveDataFavourite(faTemp);
        } else {
            setIndex(position);
        }
    };


    const renderCarousel = () => {
        if (persons && (initTimes <= 0 || persons.length >= 3)) {
            return <Carousel
                nestedScrollEnabled={false}
                layout={'default'}
                ref={ref => this.carousel = ref}
                data={persons}
                sliderWidth={WIDTH_SCREEN}
                itemWidth={350}
                renderItem={(e) => _renderItem(e)}
                onSnapToItem={position => doSnap(position)}
                pointerEvents={'auto'}

            />;
        }
        return <View/>;
    };

    return <View>
        <StatusBar backgroundColor={Colors.transparent} barStyle={'light-content'}/>
        <BackgroundMain>
            {renderCarousel()}
        </BackgroundMain>

    </View>;
}
