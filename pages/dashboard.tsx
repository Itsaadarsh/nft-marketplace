import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import { nftAddress, nftMarketAddress } from '../config'
import NFTMarket from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import { NextPage } from 'next'


interface NFTITEM {
    price: string;
    tokenId: string;
    seller: string;
    owner: string;
    image: string;
    sold: boolean;
}

const Dashboard: NextPage = () => {
    const [nfts, setNfts] = useState<NFTITEM[]>([])
    const [sold, setSold] = useState<NFTITEM[]>([])
    const [loadingState, setLoadingState] = useState('not-loaded')

    useEffect(() => {
        loadNFTs()
    }, [])

    async function loadNFTs() {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const marketplaceContract = new ethers.Contract(nftMarketAddress, NFTMarket.abi, signer)
        const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider)
        const data = await marketplaceContract.fetchItemsCreated()

        const items: NFTITEM[] = await Promise.all(data.map(async (i: any) => {
            const tokenURI = await tokenContract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenURI)
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            let item: NFTITEM = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.data.image,
                sold: i.sold
            }
            return item
        }))

        const soldItems = items.filter((i: NFTITEM) => i.sold)

        setNfts(items)
        setSold(soldItems)
        setLoadingState('loaded')
    }

    if (loadingState === 'loaded' && !nfts.length) return (
        <h1 className="py-10 px-20 text-3xl">No NFTs created</h1>
    )

    return (
        <div className="flex justify-center">
            <div className="p-4">
                <h2 className='text-2xl py-2'>Items Created</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    {nfts.map((nft, i) => (
                        <div key={i} className="border shadow rounded-xl overflow-hidden">
                            <img src={nft.image} className="rounded" />
                            <div className="p-4 bg-black">
                                <p className="text-2xl font-bold text-white">Price - {nft.price} MATIC</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='px-4'>
                {Boolean(sold.length) && (
                    <div>
                        <h2 className='text-2xl py-2'>Items Sold</h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4'>
                            {sold.map((nft, i) => (
                                <div key={i} className="border shadow rounded-xl overflow-hidden">
                                    <img src={nft.image} className="rounded" />
                                    <div className="p-4 bg-black">
                                        <p className="text-2xl font-bold text-white">Price - {nft.price} MATIC</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )

                }
            </div>
        </div>
    )
}

export default Dashboard;