import React, { useEffect, useState } from 'react'
import { useAssetStore } from '@/store/assetsStore';
import SelectSearchBox from '@/components/market/SelectSearchBox';

const AssetSearchBox = ({ id }: { id: string }) => {
    const [data, setData] = useState<any>([]);
    const { updateAsset } = useAssetStore(state => state.actions);
    const fetchData = () => {
        fetch("/words.json")
            .then((res) => res.json())
            .then((json) => setData(json))// 10만 개 이상의 더미데이터
            .catch((err) => console.error(err));
    };
    useEffect(() => {
        fetchData(); // 마운트 시 한 번만 실행
    }, []);
    const handleAssetGroupChange = (assetGroup: string) => {
        updateAsset(id, { assetGroup, exchangeRateState: false }); // 자산군
    };
    if (!data) return <p>Loading...</p>;
    return (
        <SelectSearchBox
            label='자산군'
            options={data}
            placeholder='자산군을 선택해주세요.'
            onChange={handleAssetGroupChange}
        />
    )
};

export default AssetSearchBox