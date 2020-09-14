import React from 'react';
import {View, Image} from 'react-native';
import {WIDTH_SCREEN} from '../Common/base';
import Colors from '../Theme/Colors';

function Avatar({link, styles}) {

    return <View style={[{
        // borderColor: Colors.black, borderWidth: 10,
        // width: WIDTH_SCREEN * 0.4 + 6,
        // height: WIDTH_SCREEN * 0.4 + 6,
        // borderRadius: WIDTH_SCREEN * 0.4 * 0.8,
    }, styles]}>
        <Image
            style={{
                width: WIDTH_SCREEN * 0.4,
                height: WIDTH_SCREEN * 0.4,
                borderRadius: WIDTH_SCREEN * 0.4 * 0.8,
                // margin: 4,
                borderColor: Colors.white, borderWidth: 6,
            }}
            source={{uri: link}}
            // onLoad={() => {
            //     setLoaded(true);
            // }}
        />
    </View>;
}

export default React.memo(Avatar);
