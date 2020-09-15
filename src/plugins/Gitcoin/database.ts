import { BigNumber } from 'bignumber.js'
import { walletAPI, erc20API } from '../Wallet/api'
import { gitcoinAPI } from './contracts'
import { EthereumTokenType } from '../Wallet/database/types'
import type { GitcoinDonationPayload, GitcoinDonationRecord } from './types'
import { PluginMessageCenter } from '../PluginMessages'
import type { _UnboxPromise } from 'async-call-rpc/full'
import { getNetworkSettings } from '../Wallet/UI/Developer/EthereumNetworkSettings'
import { getCurrentEthChain } from '../../extension/background-script/PluginService'

function getProvider() {
    return {
        ...gitcoinAPI,
        ...walletAPI,
        ...erc20API,
    }
}

export async function donateGrant(donation: GitcoinDonationPayload) {
    const { networkType, gitcoinMaintainerAddress, bulkCheckoutContractAddress } = getNetworkSettings(
        await getCurrentEthChain(),
    )
    const { donor_address, donation_address, donation_total, token, token_type } = donation

    let approved: _UnboxPromise<ReturnType<typeof erc20API.approve>> | undefined

    // approve splitter contract for spending erc20 token
    if (token_type === EthereumTokenType.ERC20) {
        approved = await getProvider().approve(
            donor_address,
            bulkCheckoutContractAddress,
            token?.address!,
            new BigNumber(donation_total),
        )
    }

    // donate
    const donated = await getProvider().donate(
        donor_address,
        gitcoinMaintainerAddress,
        donation_address,
        donation_total,
        token?.address,
    )

    const record: GitcoinDonationRecord = {
        donor_address,
        donation_address,
        donation_total,
        network: networkType,
        token_type,
        erc20_token: token?.address,
        ...approved,
        ...donated,
    }
    PluginMessageCenter.emit('maskbook.gitcoin.update', undefined)
    return record
}
