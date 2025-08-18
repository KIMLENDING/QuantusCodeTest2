
import Radio from '@/components/ui/Radio';
import { useReEntryStore } from '@/store/reEntryStore';
import React from 'react';

const SMAM = [
    { label: 'SMA', tooltip: '단순 이동평균선 이격도를 이용해 손절 및 재진입 로직이 적용됩니다.' },
    { label: 'EMA', tooltip: '지수 이동평균선 이격도를 이용해 손절 및 재진입 로직이 적용됩니다.' },
    { label: 'HMA', tooltip: 'HULL 이동평균선 이격도를 이용해 손절 및 재진입 로직이 적용됩니다.' }
];

const ReEntryMethod = () => {
    const { updateReEntrySettings } = useReEntryStore(state => state.actions);
    const method = useReEntryStore(state => state.reEntrySettings.method);
    return (
        <Radio
            label='전략 이동평균선 방법'
            options={SMAM}
            value={method}
            onChange={value => updateReEntrySettings({ method: value })}
        />
    );
};

export default ReEntryMethod;
