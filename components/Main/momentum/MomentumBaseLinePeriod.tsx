import React from 'react';

import { useMomentumStore } from '@/store/momentumStore';
import InputBox from '@/components/ui/InputBox';
import { handleDaysChange } from '@/utils/inputHandlers';


const MomentumBaseLinePeriod = () => {
    const { updateMomentumSettiongs } = useMomentumStore((state) => state.actions);
    const baseLinePeriod = useMomentumStore(state => state.momentumSettings.baseLinePeriod);
    return (
        <InputBox label='일수' value={baseLinePeriod}
            onChange={value => updateMomentumSettiongs({ baseLinePeriod: value })}
            tip='1 - 20까지 입력할 수 있습니다.'
            unit='일' placeholder='일수를 입력하세요'
            handler={handleDaysChange}
            handleBlur={() => {
                if (baseLinePeriod === '') {
                    updateMomentumSettiongs({ baseLinePeriod: '1' });
                }
            }}
        />
    );
};

export default MomentumBaseLinePeriod;
