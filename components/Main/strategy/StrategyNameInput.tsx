import React from 'react';
import { useStrategyStore } from '@/store/strategyStore';

const StrategyNameInput = React.memo(() => {
    const strategyName = useStrategyStore(state => state.strategyName);
    const setStrategyName = useStrategyStore(state => state.actions.setStrategyName);
    return (
        <div className="border-b-[1px] border-gray3b flex items-center">
            <input
                className="py-[10px] outline-none w-full headline-1-medium bg-transparent border-none  text-graycf "
                placeholder="전략 이름을 입력해주세요." maxLength={30}
                value={strategyName} style={{ color: 'white' }}
                onChange={(e) => setStrategyName(e.target.value)}
            />
        </div>
    );
});
export default StrategyNameInput;