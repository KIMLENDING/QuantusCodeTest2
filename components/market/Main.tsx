'use client';
import React from 'react'

import Momentum from './timingSetting/Momentum';
import ReEntry from './timingSetting/ReEntry';
import { useAssetStore } from '@/store/assetsStore';
import { useStrategyStore } from '@/store/strategyStore';
import { useMomentumStore } from '@/store/momentumStore';
import { useReEntryStore } from '@/store/reEntryStore';

import StrategyNameInput from '../Main/strategy/StrategyNameInput';
import StrategyAlgorithm from '../Main/strategy/StrategyAlgorithm';
import StrategySeed from '../Main/strategy/StrategySeed';
import StrategyRBP from '../Main/strategy/StrategyRBP';
import StrategyBRB from '../Main/strategy/StrategyBRB';
import StategyAllCheck from '../Main/strategy/StategyAllCheck';
import AssetManagement from '../Main/asset/AssetManagement';

import { validateAllState } from '@/utils/validateAllState';
import SettingPeriod from '../Main/SettingPeriod';

const Main = () => {

    // 상태는 selector로, 액션은 actions 객체에서 구조분해 할당

    const { getData: getStrategyData, reset: resetStrategy } = useStrategyStore(state => state.actions);
    const { getData: getAssetData, reset: resetAssets } = useAssetStore(state => state.actions);
    const { getData: getMomentumData, reset: resetMomentum } = useMomentumStore(state => state.actions);
    const { getData: getReEntryData, reset: resetReEntry } = useReEntryStore(state => state.actions);

    const saveAll = () => {
        const strategy = getStrategyData();
        const asset = getAssetData();
        const momentum = getMomentumData();
        const reEntry = getReEntryData();
        const allState = { strategy, asset, momentum, reEntry };
        const validationResult = validateAllState(allState);
        if (!validationResult.valid) {
            console.error('Validation errors found:', validationResult.errors);
            return;
        }
        console.log('전체 저장:', allState);
        // fetch('/api/save', { method: 'POST', body: JSON.stringify(allState) }) 등
    };


    // 초기화 로직
    const resetAll = () => {
        resetStrategy();
        resetAssets();
        resetMomentum();
        resetReEntry();
        console.log('모든 상태 초기화됨');
    };
    return (
        <section className='min-w-[900px]'>
            <div className='flex justify-between items-start sticky top-[45px] z-[99] gap-[30px] w-full bg-transparent pointer-events-none'>
                <div className="bg-gray15 w-full flex justify-between pt-[55px] z-[100] pointer-events-auto">
                    <div className='w-full relative'>
                        <div className="flex flex-col gap-[10px] w-full">
                            <StrategyNameInput />
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
                                <StrategyAlgorithm />
                                <div className='flex-shrink-0 h-[30px]' />
                                <StrategySeed />
                            </div>
                            <div className='flex-shrink-0 h-[30px]' />
                            <div className='relative flex flex-col mb-[70px]'>
                                <StrategyRBP />
                                <div className='flex-shrink-0 h-[30px]' />
                                <StrategyBRB />

                            </div>
                        </div>
                        <StategyAllCheck />
                        <div className='flex-shrink-0 h-[30px]' />
                        <AssetManagement />
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
                    <div>
                        <h2 className='body-1-normal-medium m-0 text-white'>
                            <div className='flex items-center gap-[6px] body-1-normal-medium'>
                                자산배분 설정 <span className='text-[#08c47f]'> [필수]</span>
                            </div>
                        </h2>
                        <div className='flex-shrink-0 h-[30px]' />
                        <SettingPeriod />
                        <div className='flex-shrink-0 h-[110px]' />
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