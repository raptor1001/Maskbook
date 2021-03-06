import React from 'react'
import {
    makeStyles,
    Theme,
    createStyles,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
} from '@material-ui/core'
import { useStylesExtends } from '../../../components/custom-ui-helper'
import { useI18N } from '../../../utils/i18n-next-ui'
import ShadowRootDialog from '../../../utils/shadow-root/ShadowRootDialog'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            [`@media (min-width: ${theme.breakpoints.width('md')}px)`]: {
                width: 340,
                margin: '0 auto',
            },
        },
        content: {
            wordBreak: 'break-word',
        },
    }),
)

export interface RedPacketDialogProps extends withClasses<KeysInferFromUseStyles<typeof useStyles>> {
    title?: string
    message?: string
    open: boolean
    onClose(): void
}

//#region feedback dialog
export interface FeedbackDialogProps extends RedPacketDialogProps {}

export function FeedbackDialog(props: RedPacketDialogProps) {
    const { t } = useI18N()
    const classes = useStylesExtends(useStyles(), props)
    const { open, title = 'failed', message, onClose } = props
    return (
        <ShadowRootDialog
            classes={{
                container: classes.container,
            }}
            open={open}
            fullScreen={false}
            onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText className={classes.content}>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{t('close')}</Button>
            </DialogActions>
        </ShadowRootDialog>
    )
}
//#endregion
