import React from 'react';
import {View, SafeAreaView} from 'react-native';
import Colors from '../Theme/Colors';

function BackgroundMain({children}) {

    return <View style={{backgroundColor: Colors.grey01, height: 500}}>
        <View style={{height: 100, backgroundColor: '#2c2e31'}}/>
        <SafeAreaView style={{position: 'relative', justifyContent: 'center', alignItems: 'center'}}>
            <View style={{position: 'absolute', top: -30}}>
                {children}
            </View>
        </SafeAreaView>
    </View>;
}

export default React.memo(BackgroundMain);
