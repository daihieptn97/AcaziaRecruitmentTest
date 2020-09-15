import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Avatar from '../Avatar';
import Colors from '../../Theme/Colors';
import {WIDTH_SCREEN} from '../../Common/base';
import Icon from 'react-native-vector-icons/dist/Feather';
import _ from 'lodash';
import StyleTinder from './StyleTinder';

const ICONS_SIZE = 30;
const titles = ['My info is', 'My cell is', 'My address is', 'My phone is', 'My password is'];
const IconControls = ['user', 'align-center', 'map', 'phone', 'lock'];
const colorActive = '#8ab34d';
const colorUnActive = Colors.black;

let checkData = [false, false, false, false, false];

function Tinder({user}) {
    const [indexChecked, setIndexChecked] = useState(2);
    const [checks, setChecks] = useState(() => {
        let temp = _.cloneDeep(checkData);
        temp[indexChecked] = true;
        return temp;
    });

    const doSet = (index) => {
        console.log(index);
        let temp = _.cloneDeep(checkData);
        temp[index] = true;
        console.log(temp, user.phone);
        setIndexChecked(index);
        setChecks(temp);
    };

    const getInfoFromUser = (user, index) => {
        switch (index) {
            case 0: {
                let {title, first, last} = user.name;
                return `${title.toLocaleString()}. ${first} ${last} `;
            }
            case 1: {
                return user.SSN;
            }
            case 2: {
                return user.location.street;
            }
            case 3: {
                return user.phone;
            }
            case 4: {
                return user.password;
            }
            default : {
                return '';
            }
        }
    };

    const getIconControl = (index) => {
        return <TouchableOpacity style={styles.iconControl} onPress={() => doSet(index)}>
            <View style={{alignItems: 'center'}}>
                <View
                    style={[styleTinder.borderItemControl, {borderBottomColor: checks[index] ? colorActive : Colors.white}]}/>
            </View>
            <View style={{backgroundColor: checks[index] ? colorActive : Colors.white, height: 3, marginBottom: 12}}/>
            <Icon name={IconControls[index]} size={ICONS_SIZE} color={checks[index] ? colorActive : colorUnActive}/>
        </TouchableOpacity>;
    };

    if (!user) {
        return <View style={styleTinder.containerEmpty}>
            <ActivityIndicator size="large" color={colorActive}/>
        </View>;
    }
    return <View style={styleTinder.container}>
        <View style={styleTinder.header}/>
        <View style={{marginTop: 80, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 18, color: Colors.grey02}}>
                {titles[indexChecked]}
            </Text>
            <Text style={{color: Colors.black, fontSize: 24, marginTop: 6}}>
                {getInfoFromUser(user, indexChecked)}
            </Text>
        </View>


        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 35}}>

            {getIconControl(0)}
            {getIconControl(1)}
            {getIconControl(2)}
            {getIconControl(3)}
            {getIconControl(4)}
        </View>

        <View
            style={styleTinder.wrapAvatar}>
            <Avatar link={user.picture} styles={styleTinder.avatar}/>
        </View>
    </View>;
}

export default React.memo(Tinder);

const styles = StyleSheet.create({
    iconControl: {marginHorizontal: 9},
});

const styleTinder = StyleTinder;
