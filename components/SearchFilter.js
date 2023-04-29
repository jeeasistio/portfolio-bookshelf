import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
    Box,
    TextField,
    Select,
    InputLabel,
    FormControl,
    FormHelperText,
    MenuItem,
    Grid,
    makeStyles,
    Button,
    Container,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    gridRoot: {
        width: '100%',
        margin: 0,
    },
    filtersStyle: {
        textAlign: 'center',
    },
    selectStyle: {
        width: '100%',
    },
    searchStyle: {
        display: 'flex',
        margin: theme.spacing(2, 0),
        '& > button': {
            marginLeft: theme.spacing(2),
        },
    },
}))

const defaultFilters = [
    {
        name: 'Filter',
        values: ['Title', 'Author'],
    },
    {
        name: 'Sort',
        values: ['Title', 'Author'],
    },
    {
        name: 'Order',
        values: ['Asc', 'Desc'],
    },
    {
        name: 'PerPage',
        camelName: 'perPage',
        values: ['10', '15', '20', '30', '50'],
    },
]

const SearchFilter = ({
    params,
    setParams,
    filters = defaultFilters,
    extraFilters,
}) => {
    const classes = useStyles()
    const [tempParams, setTempParams] = useState(params)

    const handleSubmit = (e) => {
        e.preventDefault()
        setParams((prev) => ({ ...prev, ...tempParams }))
    }

    const handleQuery = (e) =>
        setTempParams((prev) => ({ ...prev, query: e.target.value }))
    const handleSelect = (e, name) =>
        setTempParams((prev) => ({ ...prev, [name]: e.target.value }))

    return (
        <Container maxWidth="md" component="form" onSubmit={handleSubmit}>
            <Box xs={12} className={classes.searchStyle}>
                <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Search Books..."
                    value={tempParams['query']}
                    onChange={handleQuery}
                />
                <Button type="submit" color="primary" variant="contained">
                    Search
                </Button>
            </Box>

            <Grid
                className={classes.gridRoot}
                container
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
            >
                {filters.map(({ name, camelName, values }, index) => (
                    <Grid
                        className={classes.filtersStyle}
                        key={uuidv4()}
                        xs={6}
                        sm
                        item
                    >
                        <FormControl className={classes.selectStyle}>
                            <InputLabel id={name}>{name}</InputLabel>
                            <Select
                                labelId={name}
                                value={
                                    tempParams[camelName ?? name.toLowerCase()]
                                }
                                onChange={(e) =>
                                    handleSelect(
                                        e,
                                        camelName ?? name.toLowerCase()
                                    )
                                }
                            >
                                {values.map((value, index) => {
                                    const lcValue = value.toLowerCase()
                                    return (
                                        <MenuItem
                                            key={uuidv4()}
                                            value={lcValue}
                                        >
                                            {value}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                ))}
                {extraFilters?.map((filter, index) => (
                    <Grid
                        className={classes.filtersStyle}
                        key={uuidv4()}
                        xs={6}
                        sm
                        item
                    >
                        {extraFilters}
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default SearchFilter
