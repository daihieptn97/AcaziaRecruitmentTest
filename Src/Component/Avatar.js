import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {WIDTH_SCREEN} from '../Common/base';
import Colors from '../Theme/Colors';

function Avatar({link, styles}) {

    return <View style={[styles]}>
        <Image
            style={styleAvatar.img}
            source={{uri: link}}
        />
    </View>;
}

export default React.memo(Avatar);

const styleAvatar = StyleSheet.create({
    img: {
        width: WIDTH_SCREEN * 0.4,
        height: WIDTH_SCREEN * 0.4,
        borderRadius: WIDTH_SCREEN * 0.4 * 0.8,
        borderColor: Colors.white, borderWidth: 6,
    },
});
