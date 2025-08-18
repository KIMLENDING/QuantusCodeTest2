import React from 'react'

import { useMomentumStore } from '@/store/momentumStore'
import Checkbox from '@/components/ui/CheckBox';
import MomentumIndex from '@/components/Main/momentum/MomentumIndex';
import MomentumBaseLine from '@/components/Main/momentum/MomentumBaseLine';
import MomentumBaseMovingAvg from '@/components/Main/momentum/MomentumBaseMovingAvg';
import MomentumBaseLinePeriod from '@/components/Main/momentum/MomentumBaseLinePeriod';
import MomentumBoundaryLine from '@/components/Main/momentum/MomentumBoundaryLine';
import MomentumBoundaryMovingAvg from '@/components/Main/momentum/MomentumBoundaryMovingAvg';
import MomentumBoundaryPeriod from '@/components/Main/momentum/MomentumBoundaryPeriod';
import MomentumEntryWeight from '@/components/Main/momentum/MomentumEntryWeight';
import MomentumLiquidationWeight from '@/components/Main/momentum/MomentumLiquidationWeight';


const Momentum = () => {
    const { setMomentum } = useMomentumStore((state) => state.actions);
    const momentum = useMomentumStore((state) => state.momentum);

    const tip = "시장이 상승 추세일 때 투자를 진행하고 하락 추세일 때 현금화를 진행하여 손실을 제한하는 마켓타이밍 알고리즘 입니다. 다양한 시장 인덱스의 가격 및 변동성 기반의 가격 채널을 통해 추세를 판별합니다.";
    return (
        <article>
            <div>
                <div className='flex-shrink-0 h-[30px]' />
                <Checkbox id="momentum" label="모멘텀 마켓 타이밍" tip={tip}
                    onChange={setMomentum} checked={momentum} />
                <div className='flex-shrink-0 h-[30px]' />
            </div>
            {momentum && (
                <article className='flex flex-col gap-9 mb-8'>
                    <MomentumIndex />
                    <div className='grid grid-cols-3 gap-7'>
                        <MomentumBaseLine />
                        <MomentumBaseMovingAvg />
                        <MomentumBaseLinePeriod />
                    </div>
                    <div className='grid grid-cols-3 gap-7'>
                        <MomentumBoundaryLine />
                        <MomentumBoundaryMovingAvg />
                        <MomentumBoundaryPeriod />
                    </div>
                    <div className='grid grid-cols-2 gap-7'>
                        <MomentumEntryWeight />
                        <MomentumLiquidationWeight />
                    </div>
                </article>
            )}
        </article>
    );
}

export default Momentum;