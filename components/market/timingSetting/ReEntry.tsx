import React from 'react'
import { useReEntryStore } from '@/store/reEntryStore';
import Checkbox from '@/components/ui/CheckBox';
import ReEntryMethod from '@/components/Main/reEntry/ReEntryMethod';
import ReEntryPeriod from '@/components/Main/reEntry/ReEntryPeriod';
import ReEntryBuyROC from '@/components/Main/reEntry/ReEntryBuyROC';
import ReEntrySellROC from '@/components/Main/reEntry/ReEntrySellROC';


const tip = '해당 전략의 수익률 N일 이격도를 기준으로 손절 및 재진입 로직이 적용됩니다. (실전투자 진행 시 자동 적용됩니다.)'

const ReEntry = () => {
    const { setReEntry, } = useReEntryStore((state) => state.actions);
    const reEntry = useReEntryStore((state) => state.reEntry);

    return (
        <div>
            <div>
                <div className='flex-shrink-0 h-[30px]' />
                <Checkbox id="reEntry" label="재진입 마켓 타이밍" tip={tip}
                    onChange={setReEntry} checked={reEntry} />
                <div className='flex-shrink-0 h-[30px]' />
            </div>
            {reEntry && (
                <article className='flex flex-col gap-9 mb-8'>
                    <ReEntryMethod />
                    <ReEntryPeriod />
                    <ReEntryBuyROC />
                    <ReEntrySellROC />
                </article>
            )}
        </div>
    )
}

export default ReEntry