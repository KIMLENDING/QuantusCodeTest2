import React from 'react';

import { useMomentumStore } from '@/store/momentumStore';
import InputBox from '@/components/ui/InputBox';
import { handleNumber } from '@/utils/inputHandlers';


const MomentumBoundaryPeriod = () => {
    const { updateMomentumSettiongs } = useMomentumStore((state) => state.actions);
    const boundaryPeriod = useMomentumStore(state => state.momentumSettings.boundaryPeriod);
    return (
        <InputBox label='일수' value={boundaryPeriod}
            onChange={value => updateMomentumSettiongs({ boundaryPeriod: value })}
            tip='10 ~ 60까지 입력할 수 있습니다.'
            unit='일' placeholder='일수를 입력하세요'
            handler={handleNumber}
            handleBlur={() => {
                if (boundaryPeriod === '' || +boundaryPeriod < 10 || +boundaryPeriod > 60) {
                    updateMomentumSettiongs({ boundaryPeriod: '20' });
                }
            }}
        />
    );
};

export default MomentumBoundaryPeriod;
