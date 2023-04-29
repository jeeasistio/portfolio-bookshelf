import { createTheme, responsiveFontSizes } from '@material-ui/core/styles'

let theme = createTheme({
    palette: {
        primary: {
            light: '#444',
            main: '#333',
            dark: '#222',
        },
        secondary: {
            light: '#f2d594',
            main: '#e4c580',
            dark: '#c9b17b',
        },
    },
    typography: {
        fontSize: 16,
        fontFamily: '"Fraunces", "Merriweather"',
        h1: {
            fontFamily: 'Fraunces',
        },
        h2: {
            fontFamily: 'Fraunces',
        },
        h3: {
            fontFamily: 'Fraunces',
        },
        h4: {
            fontFamily: 'Fraunces',
        },
        h5: {
            fontFamily: 'Fraunces',
        },
        h6: {
            fontFamily: 'Merriweather',
        },
        subtitle1: {
            fontFamily: 'Merriweather',
        },
        subtitle2: {
            fontFamily: 'Merriweather',
        },
        body1: {
            fontFamily: 'Merriweather',
        },
        body2: {
            fontFamily: 'Merriweather',
        },
        button: {
            fontFamily: 'Merriweather',
        },
        caption: {
            fontFamily: 'Merriweather',
        },
        overline: {
            fontFamily: 'Merriweather',
        },
    },
    props: {
        MuiSelect: {
            MenuProps: {
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                },
                getContentAnchorEl: null,
            },
        },
    },
})

theme = responsiveFontSizes(theme)

export default theme
