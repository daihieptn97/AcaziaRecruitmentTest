import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Colors from '../Theme/Colors';

function BackgroundMain({children}) {

    return <View style={styleBackgroundMain.container}>
        <View style={styleBackgroundMain.header}/>
        <SafeAreaView style={styleBackgroundMain.safe}>
            <View style={styleBackgroundMain.wrapContent}>
                {children}
            </View>
        </SafeAreaView>
    </View>;
}

export default React.memo(BackgroundMain);

const styleBackgroundMain = StyleSheet.create({
    container: {backgroundColor: Colors.grey01, height: 500},
    header: {height: 100, backgroundColor: '#2c2e31'},
    safe: {position: 'relative', justifyContent: 'center', alignItems: 'center'},
    wrapContent: {position: 'absolute', top: -30},
});
