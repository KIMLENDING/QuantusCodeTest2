import React from 'react';

import { useMomentumStore } from '@/store/momentumStore';
import InputBox from '@/components/ui/InputBox';
import { handleWeightChange } from '@/utils/inputHandlers';


const MomentumEntryWeight = () => {
    const { updateMomentumSettiongs } = useMomentumStore((state) => state.actions);
    const entryWeight = useMomentumStore(state => state.momentumSettings.entryWeight);
    return (
        <InputBox label='진입 가중치' value={entryWeight}
            onChange={value => updateMomentumSettiongs({ entryWeight: value })}
            tip='1 ~ 5까지 입력할 수 있습니다.'
            placeholder='진입 가중치를 입력하세요'
            handler={handleWeightChange}
            handleBlur={() => {
                if (entryWeight === '' || +entryWeight < 1.0 || +entryWeight > 5.0) {
                    updateMomentumSettiongs({ entryWeight: '1' });
                } else {
                    const formattedValue = parseFloat(entryWeight).toFixed(2);
                    updateMomentumSettiongs({ entryWeight: formattedValue });
                }
            }}
            tooltip={'높을수록 진입 기준이 높아져 매수 진입이 신중해지며 매매 횟수가 줄어들게 됩니다.\n다만 너무 큰 진입 가중치는 적절한 매수 타이밍을 놓칠 수 있습니다.\n반대로 낮을 시 진입 기준이 완화되어 쉽게 매수하게 되어 매매 횟수가 늘어나 매매 수수료 및 슬리피지로 인한 손실이 커질 수 있습니다.'}
        />
    );
};

export default MomentumEntryWeight;
