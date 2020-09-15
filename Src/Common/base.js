import {Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const WIDTH_SCREEN = Dimensions.get('window').width;

export function saveDataFavourite(favourites) {
    AsyncStorage.setItem('favourites', JSON.stringify(favourites));
}

export async function getFavourite() {
    return await AsyncStorage.getItem('favourites').then(data =>
        data == null ? null : JSON.parse(data),
    );

}
