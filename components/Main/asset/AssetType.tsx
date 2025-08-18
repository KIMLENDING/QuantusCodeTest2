import React from 'react'

import { typeOfInvestment } from '@/lib/contents/exData'
import { useAssetStore } from '@/store/assetsStore';
import SelectBox from '@/components/ui/SelectBox';
interface AssetTypeProps {
    id: string;
}

const AssetType = ({ id }: AssetTypeProps) => {
    const { updateAsset } = useAssetStore(state => state.actions);
    const asset = useAssetStore(state => state.assetList.find(asset => asset.id === id)?.type);
    const handleTypeChange = (type: string) => {
        updateAsset(id, { type });// 종류
    };

    return (
        <SelectBox
            label='종류'
            options={typeOfInvestment}
            placeholder='종류를 선택해주세요.'
            value={asset}
            onChange={handleTypeChange}
        />
    );
};

export default AssetType