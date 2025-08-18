import React from 'react'
import DateOfPicker from '../ui/DateOfPicker'
import { useStrategyStore } from '@/store/strategyStore';

const SettingPeriod = () => {
    const { setStartDate, setEndDate } = useStrategyStore(state => state.actions);
    const startDate = useStrategyStore(state => state.startDate);
    const endDate = useStrategyStore(state => state.endDate);

    return (
        <div className='grid grid-cols-2 gap-4'>
            <DateOfPicker label='시작일' onChange={(date) => setStartDate(date!.toString())} value={startDate} />
            <DateOfPicker label='종료일' onChange={(date) => setEndDate(date!.toString())} value={endDate} />
        </div>
    )
}

export default SettingPeriod