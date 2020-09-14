/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {StatusBar, View} from 'react-native';
import Api, {getPersonApi} from '../Common/Api';
import Tinder from '../Component/Tinder';
import BackgroundMain from '../Component/BackgroundMain';
import Colors from '../Theme/Colors';
import _ from 'lodash';
import Carousel from 'react-native-snap-carousel';
import Toast from '../Component/Toast';

let arrTemp = [];

let initTimes = 3;
export default function () {
    const [persons, setPersons] = useState([]);
    const [index, setIndex] = useState(0);

    async function getUser() {
        try {
            const response = await Api.get(getPersonApi);
            arrTemp = _.concat(arrTemp, response.results[0].user);
            setPersons(arrTemp);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (persons.length <= 0) {
            getUser();
            getUser();
            getUser();
        }
    }, [persons]);

    const _renderItem = ({item, index}) => {
        return <Tinder user={item}/>;
    };

    const doSnap = (position) => {
        getUser();
        console.log(position, index);
        if (position < index) {
            Toast.default('Save' + persons[position].phone);
        } else {
            // setIndex(position);
        }
    };
    const renderCarousel = () => {
        if (initTimes <= 0 || persons.length >= 3) {
            return <Carousel
                layout={'default'}
                ref={ref => this.carousel = ref}
                data={arrTemp}
                sliderWidth={350}
                itemWidth={350}
                renderItem={(e) => _renderItem(e)}
                // onSnapToItem={position => doSnap(position)}
            />;
        }
        return <View/>;
    };

    return <View>
        <StatusBar backgroundColor={Colors.transparent} barStyle={'light-content'}/>
        <BackgroundMain>
            {/*<Tinder user={persons[0]}/>*/}
            {renderCarousel()}
        </BackgroundMain>
    </View>;
}
