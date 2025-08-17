import React, { useEffect, useState } from 'react'
import SelectBox from './DataList/SelectBox'
import InputBox from './InputBox'
import { typeOfInvestment } from '@/lib/contents/exData'
import SelectSearchBox from './DataList/SelectSearchBox'
import { useAssetsDataStore } from '@/store/assetsDataStore'
import Checkbox from './DataList/CheckBox'

interface AssetGroupProps {
    id: string;

}
const AssetGroup = ({ id }: AssetGroupProps) => {

    const [data, setData] = useState<any>([]);
    const [type, setType] = useState<string>(''); // SelectBox 값
    const [assetGroup, setAssetGroup] = useState<string>(''); // SelectSearchBox 값
    const [weight, setWeight] = useState<string>('0'); // InputBox 값
    const [exchange, setExchange] = useState<boolean>(false); // 체크박스 값
    const { updateAsset, getAssetItem } = useAssetsDataStore();
    const fetchData = () => {
        fetch("/words.json")
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((err) => console.error(err));
    };
    useEffect(() => {
        fetchData(); // 마운트 시 한 번만 실행
    }, []);


    useEffect(() => {

        updateAsset(id, {
            type,
            assetGroup,
            weight: weight,
            exchangeRateState: exchange
        });
        console.log(getAssetItem(id));

    }, [type, assetGroup, weight, exchange, id, updateAsset]);



    if (!data) return <p>Loading...</p>;

    return (
        <div>

            <section className='flex gap-6 flex-1'>
                <SelectBox
                    label='종류'
                    options={typeOfInvestment}
                    placeholder='종류를 선택해주세요.'
                    selected={type}
                    onChange={setType}
                />
                <SelectSearchBox
                    label='자산군'
                    options={data}
                    placeholder='자산군을 선택해주세요.'
                    onChange={setAssetGroup}
                />
                <InputBox
                    label='비중'
                    placeholder='비중 비율을 입력해주세요.'
                    unit='%'
                    tip='0 - 100까지 입력할 수 있습니다.'
                    initialValue={weight.toString()}
                    onChange={setWeight}
                />
            </section>
            {
                type === '미국 자산군' || type === '미국 ETF' || type === '미국 주식' ? (
                    <Checkbox id={id} label="환율 반영" onChange={setExchange} />
                ) : null
            }
        </div>
    )
}

export default AssetGroup