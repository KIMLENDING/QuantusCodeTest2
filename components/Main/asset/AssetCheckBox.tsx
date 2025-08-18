import Checkbox from '@/components/ui/CheckBox';
import { useAssetStore } from '@/store/assetsStore';
import React from 'react'


interface AssetCheckBoxProps {
    id: string;
}
const AssetCheckBox = ({ id }: AssetCheckBoxProps) => {
    const { updateAsset } = useAssetStore(state => state.actions);
    const asset = useAssetStore(state => state.assetList.find(asset => asset.id === id));

    const usAsset = asset?.type === '미국 자산군' || asset?.type === '미국 ETF' || asset?.type === '미국 주식';
    const handleExchangeChange = (exchangeRateState: boolean) => {
        if (!usAsset) return; // 미국 관련 자산군이 아닐 경우 함수 종료
        if (!asset.assetGroup) return; // 자산군이 선택되지 않은 경우 함수 종료
        updateAsset(id, { exchangeRateState });
    };
    return (
        <>
            {
                usAsset && (
                    <Checkbox id={id} label="환율 반영"
                        onChange={handleExchangeChange}
                        checked={asset?.exchangeRateState}
                    />
                )
            }
        </>
    )
};

export default AssetCheckBox