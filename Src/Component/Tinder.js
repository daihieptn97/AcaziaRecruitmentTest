import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import Avatar from './Avatar';
import Colors from '../Theme/Colors';
import {WIDTH_SCREEN} from '../Common/base';
import Icon from 'react-native-vector-icons/dist/Feather';
import _ from 'lodash';

const ICONS_SIZE = 30;
const titles = ['My info is', 'My cell is', 'My address is', 'My phone is', 'My password is'];
const IconControls = ['user', 'align-center', 'map', 'phone', 'lock'];
const colorActive = '#8ab34d';
const colorUnActive = Colors.black;

let checkData = [false, false, false, false, false];

function Tinder({user}) {

    const [indexChecked, setIndexChecked] = useState(2);
    const [info, setInfo] = useState('');
    const [checks, setChecks] = useState(() => {
        checkData[indexChecked] = true;
        return checkData;
    });

    const doSet = (index) => {
        let temp = _.cloneDeep(checkData);
        temp[index] = true;
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
        console.log(checks);
        return <TouchableOpacity style={styles.iconControl} onPress={() => doSet(index)}>
            <View style={{alignItems: 'center'}}>
                <View style={{
                    width: 0,
                    height: 0,
                    backgroundColor: 'transparent',
                    borderStyle: 'solid',
                    borderLeftWidth: 5,
                    borderRightWidth: 5,
                    borderBottomWidth: 8,
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                    borderBottomColor: checks[index] ? colorActive : Colors.white,
                }}/>
            </View>
            <View style={{backgroundColor: checks[index] ? colorActive : Colors.white, height: 3, marginBottom: 12}}/>
            <Icon name={IconControls[index]} size={ICONS_SIZE} color={checks[index] ? colorActive : colorUnActive}/>
        </TouchableOpacity>;
    };

    if (!user) {
        return <View style={{
            backgroundColor: Colors.white,
            width: 350,
            height: 400,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <ActivityIndicator size="large" color={colorActive}/>
        </View>;
    }
    return <View style={{backgroundColor: Colors.white, width: 350, height: 400, borderRadius: 12}}>
        <View style={{
            backgroundColor: '#e3e7eb',
            height: 130,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            borderBottomWidth: 0.6,
            borderBottomColor: Colors.black,
        }}/>
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
            style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', left: 0, right: 0, top: 20}}>
            <Avatar link={user.picture} styles={{
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1, borderColor: Colors.grey03, borderRadius: WIDTH_SCREEN * 0.4 * 0.8,
            }}/>
        </View>
    </View>;
}

export default React.memo(Tinder);

const styles = StyleSheet.create({
    iconControl: {marginHorizontal: 9},
});
