import { rebalancingPeriods } from '@/lib/contents/exData'
import React from 'react'

import { useStrategyStore } from '@/store/strategyStore';
import SelectBox from '@/components/ui/SelectBox';

const StrategyRBP = () => {
    const rebalancingPeriod = useStrategyStore(state => state.rebalancingPeriod);
    const setRebalancingPeriod = useStrategyStore(state => state.actions.setRebalancingPeriod);

    return (
        <SelectBox label='주기 리밸런싱' options={rebalancingPeriods}
            placeholder='주기 리밸런싱을 선택해주세요.'
            value={rebalancingPeriod}
            onChange={setRebalancingPeriod}
        />
    )
}

export default StrategyRBP