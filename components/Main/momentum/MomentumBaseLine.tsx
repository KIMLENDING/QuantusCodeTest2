import React from 'react';

import { baseLines } from '@/lib/contents/exData';
import { useMomentumStore } from '@/store/momentumStore';
import SelectBox from '@/components/ui/SelectBox';

const MomentumBaseLine = () => {
    const { updateMomentumSettiongs } = useMomentumStore((state) => state.actions);
    const baseLine = useMomentumStore(state => state.momentumSettings.baseLine);
    return (
        <SelectBox label='기준선' options={baseLines}
            placeholder='기준선을 선택하세요' onChange={value => updateMomentumSettiongs({ baseLine: value })}
            value={baseLine}
            tooltip='가격 채널의 기준이 되는 수익곡선 입니다. 해당 기준선을 기준으로 상단 밴드와 하단 밴드가 결정됩니다.'
        />
    );
};

export default MomentumBaseLine;
