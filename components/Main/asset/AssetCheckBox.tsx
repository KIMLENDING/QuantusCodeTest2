import Checkbox from '@/components/ui/CheckBox';
import { useAssetStore } from '@/store/assetsStore';
import React from 'react'

interface AssetCheckBoxProps {
    id: string;
}

/**
 * 리랜더링 유발 state assetList.type, assetList.exchangeRateState
 * type은 AssetType.tsx에서 구독중 selectBox컴포넌트에 사용됨
 * 그럼 selectBox에서 값이 변경되면 AssetCheckBox도 리랜더링됨 이건 필요함 왜냐 
 * usAsset의 상태에 따라 CheckBox의 화면 여부가 결정되기 때문
 *
 * 리랜더링 필요 없는 값 assetList.assetGroup 
 * assetGroup은 값이 존재 하지 않을 때  updateAsset으로 exchangeRateState의 상태를 반영하지않아야 함
 * 그래서 랜더링에 관여하지 않음 
 */
const AssetCheckBox = ({ id }: AssetCheckBoxProps) => {
    const { updateAsset, getAssetItem } = useAssetStore(state => state.actions);
    const type = useAssetStore(state => state.assetList.find(asset => asset.id === id)?.type);
    const exchangeRateState = useAssetStore(state => state.assetList.find(asset => asset.id === id)?.exchangeRateState);

    const assetGroup = getAssetItem(id)?.assetGroup;
    const usAsset = type === '미국 자산군' || type === '미국 ETF' || type === '미국 주식';
    const handleExchangeChange = (exchangeRateState: boolean) => {
        if (!usAsset) return; // 미국 관련 자산군이 아닐 경우 함수 종료
        if (!assetGroup) return; // 자산군이 선택되지 않은 경우 함수 종료
        updateAsset(id, { exchangeRateState });
    };
    console.log('AssetCheckBox')
    return (
        <>
            {
                usAsset && (
                    <Checkbox id={id} label="환율 반영"
                        onChange={handleExchangeChange}
                        checked={exchangeRateState!}
                    />
                )
            }
        </>
    )
};

export default AssetCheckBox