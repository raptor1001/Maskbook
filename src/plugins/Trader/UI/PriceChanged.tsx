import React from 'react'
import classNames from 'classnames'
import { useColorStyles } from '../../../utils/theme'
import { makeStyles, Theme, createStyles } from '@material-ui/core'

const CHAR_RISE = '\u25B2' // ▲
const CHAR_FALL = '\u25BC' // ▼

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            fontSize: 'inherit',
            marginLeft: theme.spacing(1),
        },
    })
})

export interface PriceChangedProps {
    amount: number
}

export function PriceChanged(props: PriceChangedProps) {
    const color = useColorStyles()
    const classes = useStyles()
    return (
        <span className={classNames(classes.root, props.amount > 0 ? color.success : color.error)}>
            {props.amount > 0 ? CHAR_RISE : CHAR_FALL} {props.amount.toFixed(2)}%
        </span>
    )
}
