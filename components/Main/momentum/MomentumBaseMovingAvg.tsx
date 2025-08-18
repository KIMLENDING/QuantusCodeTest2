import React from 'react';

import { avgLines } from '@/lib/contents/exData';
import { useMomentumStore } from '@/store/momentumStore';
import SelectBox from '@/components/ui/SelectBox';

const MomentumBaseMovingAvg = () => {
    const { updateMomentumSettiongs } = useMomentumStore((state) => state.actions);
    const baseMovingAvg = useMomentumStore(state => state.momentumSettings.baseMovingAvg);
    return (
        <SelectBox label='이동평균 (기준선)' options={avgLines}
            placeholder='이동평균을 선택하세요' onChange={value => updateMomentumSettiongs({ baseMovingAvg: value })}
            value={baseMovingAvg}
        />
    );
};

export default MomentumBaseMovingAvg;
