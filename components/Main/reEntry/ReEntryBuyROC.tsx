import React from 'react';

import { useReEntryStore } from '@/store/reEntryStore';
import InputBox from '@/components/ui/InputBox';
import { handleInvestmentChange } from '@/utils/inputHandlers';


const ReEntryBuyROC = () => {
    const { updateReEntrySettings } = useReEntryStore(state => state.actions);
    const buyROC = useReEntryStore(state => state.reEntrySettings.buyROC);
    return (
        <InputBox
            label='매수 이격도 기준'
            placeholder='매수 이격도 기준을 입력하세요'
            tip=''
            value={buyROC}
            onChange={value => updateReEntrySettings({ buyROC: value })}
            handler={handleInvestmentChange}
            handleBlur={() => {
                if (buyROC === '') {
                    updateReEntrySettings({ buyROC: '100' });
                }
            }}
        />
    );
};

export default ReEntryBuyROC;
