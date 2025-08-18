import React from 'react';

import { useMomentumStore } from '@/store/momentumStore';
import InputBox from '@/components/ui/InputBox';
import { handleWeightChange } from '@/utils/inputHandlers';


const MomentumLiquidationWeight = () => {
    const { updateMomentumSettiongs } = useMomentumStore((state) => state.actions);
    const liquidationWeight = useMomentumStore(state => state.momentumSettings.liquidationWeight);
    return (
        <InputBox label='청산 가중치' value={liquidationWeight}
            onChange={value => updateMomentumSettiongs({ liquidationWeight: value })}
            tip='1 ~ 5까지 입력할 수 있습니다.'
            placeholder='청산 가중치를 입력하세요'
            handler={handleWeightChange}
            handleBlur={() => {
                if (liquidationWeight === '' || +liquidationWeight < 1.0 || +liquidationWeight > 5.0) {
                    updateMomentumSettiongs({ liquidationWeight: '3' });
                } else {
                    const formattedValue = parseFloat(liquidationWeight).toFixed(2);
                    updateMomentumSettiongs({ liquidationWeight: formattedValue });
                }
            }}
            tooltip={'높을수록 청산 기준이 높아져 매도가 신중해지며 매매 횟수가 줄어듭니다.\n다만 너무 큰 청산 가중치는 적절한 매도 타이밍을 놓칠 수 있습니다.\n반대로 낮을 시 청산 기준이 완화되어 매도가 쉬워지며 매매 횟수가 늘어나 매매 수수료 및 슬리피지로 인한 손실이 커질 수 있습니다.'}
        />
    );
};

export default MomentumLiquidationWeight;
