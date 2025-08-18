import React from 'react'


import { useStrategyStore } from '@/store/strategyStore';
import InputBox from '@/components/ui/InputBox';
import { handlePercentageChange } from '@/utils/inputHandlers';

const StrategyBRB = () => {
    const bandRebalancing = useStrategyStore(state => state.bandRebalancing);
    const setBandRebalancing = useStrategyStore(state => state.actions.setBandRebalancing);

    return (
        <InputBox label='밴드 리밸런싱' placeholder='밴드 리밸런싱 기준을 입력해주세요.' unit='%'
            tip='0 ~ 100까지 입력할 수 있습니다. (0 입력시 비활성화)'
            value={bandRebalancing?.toString() || ''}
            onChange={setBandRebalancing}
            handler={handlePercentageChange}

        />
    )
}

export default StrategyBRB