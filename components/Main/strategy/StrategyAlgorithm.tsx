import React from 'react'

import { useStrategyStore } from '@/store/strategyStore';
import { algorithms } from '@/lib/contents/exData';
import SelectBox from '@/components/ui/SelectBox';

const StrategyAlgorithm = React.memo(() => {
    const algorithm = useStrategyStore(state => state.algorithm);
    const setAlgorithm = useStrategyStore(state => state.actions.setAlgorithm);

    return (
        <SelectBox label='자산배분 알고리즘' options={algorithms}
            placeholder='전략배분 (정적자산배분)'
            value={algorithm}
            onChange={setAlgorithm}

        />
    );
});

export default StrategyAlgorithm