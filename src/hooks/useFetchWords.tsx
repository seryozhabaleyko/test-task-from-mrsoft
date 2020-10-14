import { useEffect, useReducer } from 'react';
import { fetchWordsApi } from '../services/api';

const FETCH_WORDS_REQUEST = 'FETCH_WORDS_REQUEST';
const FETCH_WORDS_SUCCESS = 'FETCH_WORDS_SUCCESS';
const FETCH_WORDS_FAILURE = 'FETCH_WORDS_FAILURE';

function fetchWordsRequest() {
    return {
        type: FETCH_WORDS_REQUEST,
    } as const;
}

function fetchWordsSuccess(data: string[]) {
    return {
        type: FETCH_WORDS_SUCCESS,
        payload: data,
    } as const;
}

function fetchWordsFailure(error: Error | null) {
    return {
        type: FETCH_WORDS_FAILURE,
        payload: error,
    } as const;
}

interface State {
    loading: boolean;
    data: string[];
    error: Error | null;
}

type Action =
    | ReturnType<typeof fetchWordsRequest>
    | ReturnType<typeof fetchWordsSuccess>
    | ReturnType<typeof fetchWordsFailure>;

const initialState: State = {
    loading: false,
    data: [],
    error: null,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case FETCH_WORDS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_WORDS_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case FETCH_WORDS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
}

function useFetchWords(): State {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        async function fetchWords() {
            try {
                dispatch(fetchWordsRequest());
                const response = await fetchWordsApi();
                dispatch(fetchWordsSuccess(response.data.data));
            } catch (error) {
                dispatch(fetchWordsFailure(error));
            }
        }

        fetchWords();
    }, []);

    return state;
}

export { useFetchWords };
