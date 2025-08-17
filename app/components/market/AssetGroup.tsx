import React, { useEffect, useState } from 'react'
import InputBox from '../Ui/InputBox'
import { typeOfInvestment } from '@/lib/contents/exData'
import SelectSearchBox from './SelectSearchBox'
import Checkbox from '../Ui/CheckBox'
import { handlePercentageChange } from '@/app/utils/inputHandlers'
import SelectBox from '../Ui/SelectBox'
import { useAssetStore } from '@/store/assetsStore'

interface AssetGroupProps {
    id: string;

}
const AssetGroup = ({ id }: AssetGroupProps) => {

    const [data, setData] = useState<any>([]);
    const { updateAsset, getAssetItem } = useAssetStore();
    const asset = getAssetItem(id);
    const usAsset = asset?.type === '미국 자산군' || asset?.type === '미국 ETF' || asset?.type === '미국 주식';
    const fetchData = () => {
        fetch("/words.json")
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((err) => console.error(err));
    };
    useEffect(() => {
        fetchData(); // 마운트 시 한 번만 실행
    }, []);


    // 각 입력값 변경 시 바로 updateAsset 호출
    const handleTypeChange = (type: string) => {
        updateAsset(id, { type });// 종류
    };
    const handleAssetGroupChange = (assetGroup: string) => {
        updateAsset(id, { assetGroup, exchangeRateState: false }); // 자산군
    };
    const handleWeightChange = (weight: string) => {
        updateAsset(id, { weight });
    };
    const handleExchangeChange = (exchangeRateState: boolean) => {
        if (!usAsset) return; // 미국 관련 자산군이 아닐 경우 함수 종료
        if (!asset.assetGroup) return; // 자산군이 선택되지 않은 경우 함수 종료
        updateAsset(id, { exchangeRateState });
    };



    if (!data) return <p>Loading...</p>;

    return (
        <div>

            <section className='flex gap-6 flex-1'>
                <SelectBox
                    label='종류'
                    options={typeOfInvestment}
                    placeholder='종류를 선택해주세요.'
                    value={asset?.type}
                    onChange={handleTypeChange}
                />
                <SelectSearchBox
                    label='자산군'
                    options={data}
                    placeholder='자산군을 선택해주세요.'
                    onChange={handleAssetGroupChange}
                />
                <InputBox
                    label='비중'
                    placeholder='비중 비율을 입력해주세요.'
                    unit='%'
                    tip='0 - 100까지 입력할 수 있습니다.'
                    value={asset?.weight}
                    onChange={handleWeightChange}
                    handler={handlePercentageChange}
                />
            </section>
            {
                usAsset && (
                    <Checkbox id={id} label="환율 반영"
                        onChange={handleExchangeChange}
                        checked={asset?.exchangeRateState}

                    />
                )
            }
        </div>
    )
}

export default AssetGroup