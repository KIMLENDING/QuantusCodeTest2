import React from 'react';

import { bands } from '@/lib/contents/exData';
import { useMomentumStore } from '@/store/momentumStore';
import SelectBox from '@/components/ui/SelectBox';

const MomentumBoundaryLine = () => {
    const { updateMomentumSettiongs } = useMomentumStore((state) => state.actions);
    const boundaryLine = useMomentumStore(state => state.momentumSettings.boundaryLine);
    return (
        <SelectBox label='경계선 (밴드)' options={bands}
            placeholder='기준선을 선택하세요' onChange={value => updateMomentumSettiongs({ boundaryLine: value })}
            value={boundaryLine}
            tooltip={'기준선을 기반으로 가격과 변동성을 기반으로 계산된 수익곡선에 가중치를 부여하여 상/하단 밴드를 생성합니다.\n경계선과 종가의 관계를 통해 상승 추세와 하락 추세를 판별하여 마켓타이밍 시그널을 생성합니다.'}
        />
    );
};

export default MomentumBoundaryLine;
