import React from 'react';

import { useReEntryStore } from '@/store/reEntryStore';
import InputBox from '@/components/ui/InputBox';
import { handleInvestmentChange } from '@/utils/inputHandlers';


const ReEntrySellROC = () => {
    const { updateReEntrySettings } = useReEntryStore(state => state.actions);
    const sellROC = useReEntryStore(state => state.reEntrySettings.sellROC);
    return (
        <InputBox
            label='매도 이격도 기준'
            placeholder='매도 이격도 기준을 입력하세요'
            tip=''
            value={sellROC}
            onChange={value => updateReEntrySettings({ sellROC: value })}
            handler={handleInvestmentChange}
            handleBlur={() => {
                if (sellROC === '') {
                    updateReEntrySettings({ sellROC: '100' });
                }
            }}
        />
    );
};

export default ReEntrySellROC;
