import React from 'react'

import { useAssetStore } from '@/store/assetsStore';
import InputBox from '@/components/ui/InputBox';
import { handlePercentageChange } from '@/utils/inputHandlers';

interface AssetWeightProps {
    id: string;
}
const AssetWeight = ({ id }: AssetWeightProps) => {
    const { updateAsset } = useAssetStore(state => state.actions);
    const asset = useAssetStore(state => state.assetList.find(asset => asset.id === id)?.weight);
    const handleWeightChange = (weight: string) => {
        updateAsset(id, { weight });
    };
    return (
        <InputBox
            label='비중'
            placeholder='비중 비율을 입력해주세요.'
            unit='%'
            tip='0 - 100까지 입력할 수 있습니다.'
            value={asset}
            onChange={handleWeightChange}
            handler={handlePercentageChange}
        />
    )
}
export default AssetWeight;
