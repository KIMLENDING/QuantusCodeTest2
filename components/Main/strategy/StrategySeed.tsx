import React from 'react'

import { useStrategyStore } from '@/store/strategyStore';
import InputBox from '@/components/ui/InputBox';
import { handleInvestmentChange } from '@/utils/inputHandlers';

const StrategySeed = () => {
    const seed = useStrategyStore(state => state.seed);
    const setSeed = useStrategyStore(state => state.actions.setSeed);
    return (
        <InputBox label='초기 투자 금액' placeholder='초기 투자 금액을 입력해주세요.'
            unit='만원' tip=''
            value={seed}
            onChange={setSeed}
            handler={handleInvestmentChange}

        />
    )
}

export default StrategySeed