import { createContext, useReducer } from 'react'
import Popup from '../components/popups/Popup'
import LoaderPopup from '../components/popups/LoaderPopup'

const initalState = {
    popupData: null,
    options: {
        dismissable: true,
        showClose: false,
        useScrollView: false,
        cardStyle: null,
        scrollViewStyle: null,
        scrollViewContainerStyle: null,
        onClose: null
    },
    visible: false,
    backgroundcolor: 'rgba(0,0,0,.7)',
    // Select Popup states
    selectText: '',
    selected: '',
    selectPopupData: null,
    selectOptions: {
        dismissable: true,
        showClose: false,
        useScrollView: true,
        cardStyle: null,
        scrollViewStyle: null,
        scrollViewContainerStyle: null,
        displayName: 'DisplayName',
        valueName: 'Value'
    },
    onSelect: null,
    onClose: null,
    selectVisible: false,
    // Loader state
    loaderVisible: false
}
export const PopupContext = createContext();

const PopupReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW':
            return {
                ...state,
                popupData: action.data,
                options: {
                    ...initalState.options,
                    ...action.options
                },
                backgroundcolor: '#fff',
                visible: true,
                selectVisible: false
            };
        case 'HIDE':
            return {
                ...state,
                popupData: null,
                options: initalState.options,
                visible: false
            }
        case 'SHOW_SELECT':
            return {
                ...state,
                selectText: action.text,
                selected: action.selected,
                selectPopupData: action.data,
                onSelect: action.onSelect,
                onClose: action.onClose,
                selectOptions: {
                    ...initalState.selectOptions,
                    ...action.options
                },
                selectVisible: true
            };
        case 'SHOW_LAST_SELECT':
            return {
                ...state,
                selectVisible: true
            };
        case 'SHOW_PAGE':
            return {
                ...state,
                selectText: action.text,
                children: action.children,
                onClose: action.onClose,
                selectOptions: {
                    ...initalState.selectOptions,
                    ...action.options
                },
                selectVisible: true
            };
        case 'HIDE_SELECT':
            return {
                ...state,
                ...initalState
            }
        case 'TOGGLE_LOADER':
            // console.log('color ===>', action.backcolor)
            return {
                ...state,
                loaderVisible: !state.loaderVisible,
                backgroundcolor: action.backcolor
            }
        case 'HIDE_LOADER':
            return {
                ...state,
                loaderVisible: false
            }
        case 'SHOW_LOADER':
            return {
                ...state,
                loaderVisible: true
            }
        default:
            return state
    }
};

const PopupProvider = ({ children }) => {
    const [state, dispatch] = useReducer(PopupReducer, initalState)

    const showPopup = (data, options = initalState.options) => {
        dispatch({
            type: 'SHOW',
            data,
            options
        })
    }
    const hidePopup = () => {
        dispatch({
            type: 'HIDE'
        })
    }
    const toggleLoader = (type = 'toggle', backcolor = 'rgba(0,0,0,.7)') => {
        if (type === 'show') {
            showLoader()
        } else if (type === 'hide') {
            hideLoader()
        } else {
            dispatch({
                type: 'TOGGLE_LOADER', backcolor
            })
        }
    }
    const hideLoader = () => {
        dispatch({
            type: 'HIDE_LOADER'
        })
    }
    const showLoader = () => {
        dispatch({
            type: 'SHOW_LOADER'
        })
    }

    return (
        <>
            <LoaderPopup
                visible={state.loaderVisible}
                backgroundColor={state.backgroundcolor}
            />
            <PopupContext.Provider value={{
                showPopup,
                hidePopup,
                toggleLoader,
                hideLoader,
                showLoader
            }}>
                {children}

                <Popup
                    isOpen={state.visible}
                    onClose={hidePopup}
                >
                    {state.popupData}
                </Popup>

            </PopupContext.Provider>
        </>
    )
}
export default PopupProvider;
