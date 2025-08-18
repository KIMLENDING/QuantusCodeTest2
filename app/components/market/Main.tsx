'use client';
import React from 'react'
import InputBox from '../Ui/InputBox';
import { algorithms, rebalancingPeriods } from '@/lib/contents/exData'; // Assuming algorithms is defined in exData
import AssetData from './AssetData';

import AllCheckbox from '../Ui/AllCheckBox';
import Momentum from './timingSetting/Momentum';
import ReEntry from './timingSetting/ReEntry';
import { handleInvestmentChange, handlePercentageChange } from '@/app/utils/inputHandlers';
import SelectBox from '../Ui/SelectBox';
import { useAssetStore } from '@/store/assetsStore';
import { useStrategyStore } from '@/store/strategyStore';
import { useMomentumStore } from '@/store/momentumStore';
import { useReEntryStore } from '@/store/reEntryStore';
import Checkbox from '../Ui/CheckBox';

const Main = () => {

    const { strategyName, setStrategyName,
        algorithm, setAlgorithm,
        seed, setSeed, rebalancingPeriod,
        setRebalancingPeriod, bandRebalancing,
        setBandRebalancing, } = useStrategyStore();
    const { assetList, addAsset, } = useAssetStore();
    const saveAll = () => {
        const strategy = useStrategyStore.getState().getData();
        const asset = useAssetStore.getState().getData();
        const momentum = useMomentumStore.getState().getData();
        const reEntry = useReEntryStore.getState().getData();

        // 원하는 방식으로 저장 (예: 서버 전송, localStorage 등)
        const allState = {
            strategy,
            asset,
            momentum,
            reEntry,
        };
        console.log('전체 저장:', allState);
        // fetch('/api/save', { method: 'POST', body: JSON.stringify(allState) }) 등
    };
    const handleAllCheck = () => {
        // 미국 자산군 
        const usAssets = assetList.filter(asset =>
            asset.type === '미국 자산군' ||
            asset.type === '미국 ETF' ||
            asset.type === '미국 주식'
        );
        // 자산군이 있을 때
        if (usAssets.length !== 0) {
            // 참이면 
            const allExchangeRatesState = usAssets.every(asset => asset.exchangeRateState);
            if (allExchangeRatesState) return true; // 체크박스 활성화
            // 거짓이면 체크박스 비활성화
            return false;
        }
        // 자산군이 없으면 체크박스 비활성화
        return false;
    }
    const onChangeAllCheck = (checked: boolean) => {
        // 미국 자산군만 필터링
        const usAssets = assetList.filter(asset =>
            asset.type === '미국 자산군' ||
            asset.type === '미국 ETF' ||
            asset.type === '미국 주식'
        );
        // 미국 관련 자산군이 있을 때만 전체 환율 반영 상태 업데이트
        if (usAssets.length !== 0) {
            usAssets.forEach(asset => {
                useAssetStore.getState().updateAsset(asset.id, { exchangeRateState: checked });
            });
        }

    }

    // 초기화 로직
    const resetAll = () => {
        useStrategyStore.getState().reset();
        useAssetStore.getState().reset();
        useMomentumStore.getState().reset();
        useReEntryStore.getState().reset();
        console.log('모든 상태 초기화됨');
    };

    return (
        <section className='min-w-[900px]'>
            <div className='flex justify-between items-start sticky top-[45px] z-[99] gap-[30px] w-full bg-transparent pointer-events-none'>
                <div className="bg-gray15 w-full flex justify-between pt-[55px] z-[100] pointer-events-auto">
                    <div className='w-full relative'>
                        <div className="flex flex-col gap-[10px] w-full">
                            <div className="border-b-[1px] border-gray3b flex items-center">
                                <input className="py-[10px] outline-none w-full headline-1-medium bg-transparent border-none  text-graycf "
                                    placeholder="전략 이름을 입력해주세요." maxLength={30}
                                    value={strategyName} style={{ color: 'white' }}
                                    onChange={(e) => setStrategyName(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-[55px] z-[100] flex flex-col gap-5 pb-4 bg-gray15 pointer-events-auto">
                    <button type="button"
                        className="flex items-center justify-center p-3
                     rounded font-bold bg-[#08c47f33] text-[#06c47f] w-[160px]"
                        onClick={saveAll}
                    >
                        저장하기
                    </button>
                    <div className="flex  flex-col gap-5">
                        <button type="button" className="flex items-center justify-center w-full 
                        py-3 rounded font-bold  bg-white text-gray15 max-w-[160px] text-center overflow-hidden"
                            onClick={() => { console.log('백테스트 클릭') }}>
                            백테스트
                        </button>
                        <button type="button" className="flex items-center justify-center w-full 
                        py-3 rounded font-bold  bg-white text-gray15 max-w-[160px] text-center overflow-hidden 
                        disabled:opacity-20 disabled:text-gray15 disabled:cursor-not-allowed"
                            onClick={() => { console.log('포트 추출 클릭') }}
                        >
                            포트 추출
                        </button>
                    </div>
                </div>
            </div>

            <section className='flex gap-[30px] relative mt-[-100px]'>
                <div>
                    <div className='min-w-[800px] '>
                        <div>
                            <div className='relative flex flex-col'>
                                <h2 className='body-1-normal-medium m-0 text-white'>
                                    <div className='flex items-center gap-[6px] body-1-normal-medium'>
                                        자산배분 설정 <span className='text-[#08c47f]'> [필수]</span>
                                    </div>
                                </h2>
                                <div className='flex-shrink-0 h-[30px]' />
                                <SelectBox label='자산배분 알고리즘' options={algorithms}
                                    placeholder='전략배분 (정적자산배분)'
                                    value={algorithm}
                                    onChange={setAlgorithm}

                                />
                                <div className='flex-shrink-0 h-[30px]' />
                                <InputBox label='초기 투자 금액' placeholder='초기 투자 금액을 입력해주세요.'
                                    unit='만원' tip=''
                                    value={seed}
                                    onChange={setSeed}
                                    handler={handleInvestmentChange}

                                />
                            </div>
                            <div className='flex-shrink-0 h-[30px]' />
                            <div className='relative flex flex-col mb-[70px]'>
                                <SelectBox label='주기 리밸런싱' options={rebalancingPeriods}
                                    placeholder='주기 리밸런싱을 선택해주세요.'
                                    value={rebalancingPeriod}
                                    onChange={setRebalancingPeriod}
                                />
                                <div className='flex-shrink-0 h-[30px]' />
                                <InputBox label='밴드 리밸런싱' placeholder='밴드 리밸런싱 기준을 입력해주세요.' unit='%'
                                    tip='0 ~ 100까지 입력할 수 있습니다. (0 입력시 비활성화)'
                                    value={bandRebalancing?.toString() || ''}
                                    onChange={setBandRebalancing}
                                    handler={handlePercentageChange}

                                />

                            </div>
                        </div>
                        <Checkbox id='전체 환율 반영' label='전체 환율 반영'
                            tip=''
                            checked={handleAllCheck()}
                            onChange={onChangeAllCheck}
                        />
                        <div className='flex-shrink-0 h-[30px]' />
                        <div className='relative flex flex-col'>
                            <div>
                                <h2 className='body-1-normal-medium m-0 text-white'>
                                    <div className='flex items-center gap-[6px] body-1-normal-medium'>
                                        자산군 추가 <span className='text-[#08c47f]'> [필수]</span>
                                    </div>
                                </h2>
                                <div className='flex-shrink-0 h-[30px]' />
                            </div>
                            {assetList.length === 0 ? (
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
                                    assetList.map((asset, index) => (
                                        <AssetData key={asset.id} id={asset.id} title={`자산 ${index + 1}`} end={index === assetList.length - 1} />
                                    )))
                            }
                        </div>
                    </div>
                    <div className='relative flex flex-col  '>
                        <h2 className='body-1-normal-medium m-0 text-white'>
                            <div className='flex items-center gap-[6px] body-1-normal-medium'>
                                마켓 타이밍 설정
                            </div>
                        </h2>
                        <Momentum />
                        <div className='h-[1px] bg-[#252525]' />
                        <ReEntry />
                    </div>
                </div>

                <div className='relative w-[161px] pt-[150px] '>
                    <div className="sticky top-[350px] z-10 bg-gray15 left-0 w-[161px]">
                        <button className="flex items-center gap-1 
                        label-1-normal-regular text-white py-3 px-6
                        border border-gray3b rounded-[6px]"
                            onClick={resetAll}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.53033 7.21967C8.82322 7.51256 8.82322 7.98744 8.53033 8.28033L5.81066 11L8.53033 13.7197C8.82322 14.0126 8.82322 14.4874 8.53033 14.7803C8.23744 15.0732 7.76256 15.0732 7.46967 14.7803L4.21967 11.5303C3.92678 11.2374 3.92678 10.7626 4.21967 10.4697L7.46967 7.21967C7.76256 6.92678 8.23744 6.92678 8.53033 7.21967ZM12.5303 7.21967C12.8232 7.51256 12.8232 7.98744 12.5303 8.28033L10.5607 10.25H14.25C17.4256 10.25 20 12.8244 20 16V16.25C20 16.6642 19.6642 17 19.25 17C18.8358 17 18.5 16.6642 18.5 16.25V16C18.5 13.6528 16.5972 11.75 14.25 11.75H10.5607L12.5303 13.7197C12.8232 14.0126 12.8232 14.4874 12.5303 14.7803C12.2374 15.0732 11.7626 15.0732 11.4697 14.7803L8.21967 11.5303C7.92678 11.2374 7.92678 10.7626 8.21967 10.4697L11.4697 7.21967C11.7626 6.92678 12.2374 6.92678 12.5303 7.21967Z" fill="#CFCFCF" />
                            </svg>
                            설정 값 초기화
                        </button>
                    </div>
                </div>
            </section>


        </section>
    )
}

export default Main