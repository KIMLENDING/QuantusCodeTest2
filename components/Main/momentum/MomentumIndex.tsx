import React from 'react'

import { indexs } from '@/lib/contents/exData'
import { useMomentumStore } from '@/store/momentumStore';
import SelectBoxVirtual from '@/components/ui/SelectBoxVirtual';

const MomentumIndex = () => {
    const { updateMomentumSettiongs } = useMomentumStore((state) => state.actions);
    const index = useMomentumStore(state => state.momentumSettings.index);
    return (
        <SelectBoxVirtual label='대상 인덱스' options={indexs}
            placeholder='인덱스를 선택하세요' onChange={value => updateMomentumSettiongs({ index: value })}
            value={index}
        />
    )
};

export default MomentumIndex