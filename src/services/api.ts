import axios from 'axios';
import { url } from '../constants';

export function fetchWordsApi() {
    return axios.get(url);
}
