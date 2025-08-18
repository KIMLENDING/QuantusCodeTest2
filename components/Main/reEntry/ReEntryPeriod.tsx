import React from 'react';

import { useReEntryStore } from '@/store/reEntryStore';
import InputBox from '@/components/ui/InputBox';
import { handlePeriodChange } from '@/utils/inputHandlers';


const ReEntryPeriod = () => {
    const { updateReEntrySettings } = useReEntryStore(state => state.actions);
    const period = useReEntryStore(state => state.reEntrySettings.period);
    return (
        <InputBox
            label='전략 이동평균선 기간'
            placeholder='기간을 입력하세요'
            unit='일'
            tip='5 ~ 200까지 입력할 수 있습니다.'
            value={period}
            onChange={value => updateReEntrySettings({ period: value })}
            handler={handlePeriodChange}
            handleBlur={() => {
                if (period === '' || +period < 5 || +period > 200) {
                    updateReEntrySettings({ period: '20' });
                }
            }}
        />
    );
};

export default ReEntryPeriod;
