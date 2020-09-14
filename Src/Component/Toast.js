import Toast from 'react-native-root-toast';

const styles = {
    backgroundColor: '#e2e2e2',
    textStyle: {fontSize: 13, fontWeight: '300'},
    shadow: false,
    textColor: 'black',
    containerStyle: {
        borderRadius: 50,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 20,
    },
    opacity: 0.8,
};

export default class ToastJS {
    static default = function (text) {
        Toast.show(text, styles);
    };


}
