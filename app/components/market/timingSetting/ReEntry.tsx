import React from 'react'
import Radio from '../../Ui/Radio'

const SMAM = [
    { label: 'SMA', tooltip: '단순 이동평균선 이격도를 이용해 손절 및 재진입 로직이 적용됩니다.' },
    { label: 'EMA', tooltip: '지수 이동평균선 이격도를 이용해 손절 및 재진입 로직이 적용됩니다.' },
    { label: 'HMA', tooltip: 'HULL 이동평균선 이격도를 이용해 손절 및 재진입 로직이 적용됩니다.' }
]

const ReEntry = () => {
    return (
        <div>

            <Radio
                name="전략이동평균선방법"
                options={SMAM}
                value="1"
                onChange={(value) => console.log(value)}
            />
        </div>
    )
}

export default ReEntry