import React from 'react';

import { avgLines } from '@/lib/contents/exData';
import { useMomentumStore } from '@/store/momentumStore';
import SelectBox from '@/components/ui/SelectBox';

const MomentumBoundaryMovingAvg = () => {
    const { updateMomentumSettiongs } = useMomentumStore((state) => state.actions);
    const boundaryMovingAvg = useMomentumStore(state => state.momentumSettings.boundaryMovingAvg);
    return (
        <SelectBox label='이동평균 (경계선)' options={avgLines}
            placeholder='기준선을 선택하세요' onChange={value => updateMomentumSettiongs({ boundaryMovingAvg: value })}
            value={boundaryMovingAvg}
        />
    );
};

export default MomentumBoundaryMovingAvg;
