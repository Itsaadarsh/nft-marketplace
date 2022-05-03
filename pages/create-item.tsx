import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import { nftAddress, nftMarketAddress } from '../config'
import NFTMarket from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import { NextPage } from 'next'

const client = ipfsHttpClient({ url: 'https://ipfs.infura.io:5001/api/v0' })

const createPage: NextPage = () => {
    return (
        <div>create nfts</div>
    )
}

export default createPage