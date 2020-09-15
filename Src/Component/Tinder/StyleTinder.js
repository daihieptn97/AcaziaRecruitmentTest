import {StyleSheet} from 'react-native';
import Colors from '../../Theme/Colors';
import {WIDTH_SCREEN} from '../../Common/base';

export default StyleSheet.create({
    avatar: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1, borderColor: Colors.grey03, borderRadius: WIDTH_SCREEN * 0.4 * 0.8,
    },
    wrapAvatar: {position: 'absolute', justifyContent: 'center', alignItems: 'center', left: 0, right: 0, top: 20},
    container: {backgroundColor: Colors.white, width: 350, height: 400, borderRadius: 12},
    header: {
        backgroundColor: '#e3e7eb',
        height: 130,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomWidth: 0.6,
        borderBottomColor: Colors.black,
    },
    containerEmpty: {
        backgroundColor: Colors.white,
        width: 350,
        height: 400,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    borderItemControl: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderBottomWidth: 8,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
    },
});
