import React from 'react'
import Radio from '../../Ui/Radio'
import { useReEntryStore } from '@/store/reEntryStore';
import Checkbox from '../../Ui/CheckBox';
import InputBox from '../../Ui/InputBox';
import { handleInvestmentChange, handlePeriodChange } from '@/app/utils/inputHandlers';

const SMAM = [
    { label: 'SMA', tooltip: '단순 이동평균선 이격도를 이용해 손절 및 재진입 로직이 적용됩니다.' },
    { label: 'EMA', tooltip: '지수 이동평균선 이격도를 이용해 손절 및 재진입 로직이 적용됩니다.' },
    { label: 'HMA', tooltip: 'HULL 이동평균선 이격도를 이용해 손절 및 재진입 로직이 적용됩니다.' }
]
const tip = '해당 전략의 수익률 N일 이격도를 기준으로 손절 및 재진입 로직이 적용됩니다. (실전투자 진행 시 자동 적용됩니다.)'

const ReEntry = () => {
    const { reEntry, setReEntry, getReEntrySettings, updateReEntrySettings } = useReEntryStore();

    return (
        <div>
            <div>
                <div className='flex-shrink-0 h-[30px]' />
                <Checkbox id="reEntry" label="재진입 마켓 타이밍" tip={tip}
                    onChange={setReEntry} checked={reEntry} />
                <div className='flex-shrink-0 h-[30px]' />
            </div>
            {reEntry && (
                <article className='flex flex-col gap-9 mb-8'>

                    <Radio
                        label='전략 이동평균선 방법'
                        options={SMAM}
                        value={getReEntrySettings().method}
                        onChange={(value) => updateReEntrySettings({ method: value })}
                    />

                    <InputBox
                        label='전략 이동평균선 기간'
                        placeholder='기간을 입력하세요'
                        unit='일'
                        tip='5 ~ 200까지 입력할 수 있습니다.'
                        value={getReEntrySettings().period}
                        onChange={(value) => updateReEntrySettings({ period: value })}
                        handler={handlePeriodChange}
                        handleBlur={() => {
                            if (getReEntrySettings().period === '' || +getReEntrySettings().period < 5 || +getReEntrySettings().period > 200) {
                                updateReEntrySettings({ period: '20' });
                            }
                        }}
                    />

                    <InputBox
                        label='매수 이격도 기준'
                        placeholder='매수 이격도 기준을 입력하세요'
                        tip=''
                        value={getReEntrySettings().buyROC}
                        onChange={(value) => updateReEntrySettings({ buyROC: value })}
                        handler={handleInvestmentChange}
                        handleBlur={() => {
                            if (getReEntrySettings().buyROC === '') {
                                updateReEntrySettings({ buyROC: '100' });
                            }
                        }}
                    />
                    <InputBox
                        label='매도 이격도 기준'
                        placeholder='매도 이격도 기준을 입력하세요'
                        tip=''
                        value={getReEntrySettings().sellROC}
                        onChange={(value) => updateReEntrySettings({ sellROC: value })}
                        handler={handleInvestmentChange}
                        handleBlur={() => {
                            if (getReEntrySettings().sellROC === '') {
                                updateReEntrySettings({ sellROC: '100' });
                            }
                        }}
                    />
                </article>
            )}
        </div>
    )
}

export default ReEntry