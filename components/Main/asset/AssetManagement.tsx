import AssetData from '@/components/market/AssetData';
import { useAssetStore } from '@/store/assetsStore';
import React from 'react'


const AssetManagement = () => {
    const assetIds = useAssetStore(state => state.assetList.length); // 하위에서 assetList에 자산이 추가 or 삭제가 발생하지 않고 수정만 발생하면 불필요한 리랜더링 발생하지 않음 
    const { addAsset, getData } = useAssetStore(state => state.actions);

    return (
        <div className='relative flex flex-col'>
            <div>
                <h2 className='body-1-normal-medium m-0 text-white'>
                    <div className='flex items-center gap-[6px] body-1-normal-medium'>
                        자산군 추가 <span className='text-[#08c47f]'> [필수]</span>
                    </div>
                </h2>
                <div className='flex-shrink-0 h-[30px]' />
            </div>
            {assetIds === 0 ? (
                <section className='flex justify-start mb-[30px]'>
                    <div className="flex gap-5 items-center">
                        <button type="button" className="justify-center w-full p-2 pr-3 text-gray15 rounded font-bold bg-white flex items-center 
                                                gap-1 label-1-normal-medium"
                            onClick={() => addAsset()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M13.5 9.75H9.75V13.5C9.75 13.6989 9.67098 13.8897 9.53033 14.0303C9.38968 14.171 9.19891 14.25 9 14.25C8.80109 14.25 8.61032 14.171 8.46967 14.0303C8.32902 13.8897 8.25 13.6989 8.25 13.5V9.75H4.5C4.30109 9.75 4.11032 9.67098 3.96967 9.53033C3.82902 9.38968 3.75 9.19891 3.75 9C3.75 8.80109 3.82902 8.61032 3.96967 8.46967C4.11032 8.32902 4.30109 8.25 4.5 8.25H8.25V4.5C8.25 4.30109 8.32902 4.11032 8.46967 3.96967C8.61032 3.82902 8.80109 3.75 9 3.75C9.19891 3.75 9.38968 3.82902 9.53033 3.96967C9.67098 4.11032 9.75 4.30109 9.75 4.5V8.25H13.5C13.6989 8.25 13.8897 8.32902 14.0303 8.46967C14.171 8.61032 14.25 8.80109 14.25 9C14.25 9.19891 14.171 9.38968 14.0303 9.53033C13.8897 9.67098 13.6989 9.75 13.5 9.75Z" fill="#151515" />
                            </svg>
                            자산 추가
                        </button>
                    </div>
                </section>)
                : (
                    getData().assetList.map((asset, index) => (
                        <AssetData key={asset.id} id={asset.id} title={`자산 ${index + 1}`} end={index === getData().assetList.length - 1} />
                    )))
            }
        </div>
    )
}

export default AssetManagement