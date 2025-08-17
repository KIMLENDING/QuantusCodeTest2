import React from 'react'
import Checkbox from '../../Ui/CheckBox'
import SelectBoxVirtual from '../../Ui/SelectBoxVirtual'
import { avgLines, bands, baseLines, indexs } from '@/lib/contents/exData'
import SelectBox from '../../Ui/SelectBox'
import InputBox from '../../Ui/InputBox'
import { handleNumber, handleDaysChange, handleWeightChange } from '@/app/utils/inputHandlers'
import { useMomentumStore } from '@/store/momentumStore'

const Momentum = () => {
    const { setMomentum, momentum, updateMomentumSettiongs, getMomentumSettings } = useMomentumStore();
    const tip = "시장이 상승 추세일 때 투자를 진행하고 하락 추세일 때 현금화를 진행하여 손실을 제한하는 마켓타이밍 알고리즘 입니다. 다양한 시장 인덱스의 가격 및 변동성 기반의 가격 채널을 통해 추세를 판별합니다."
    return (
        <article>
            <div>
                <div className='flex-shrink-0 h-[30px]' />
                <Checkbox id="momentum" label="모멘텀 마켓 타이밍" tip={tip}
                    onChange={setMomentum} checked={momentum} />
                <div className='flex-shrink-0 h-[30px]' />
            </div>
            {momentum && (
                <article className='flex flex-col gap-9 mb-8'>
                    <SelectBoxVirtual label='대상 인덱스' options={indexs}
                        placeholder='인덱스를 선택하세요' onChange={value => updateMomentumSettiongs({ index: value })}
                        value={getMomentumSettings().index}
                    />
                    <div className='grid grid-cols-3 gap-7'>
                        <SelectBox label='기준선' options={baseLines}
                            placeholder='기준선을 선택하세요' onChange={value => updateMomentumSettiongs({ baseLine: value })}
                            value={getMomentumSettings().baseLine}
                            tooltip='가격 채널의 기준이 되는 수익곡선 입니다. 해당 기준선을 기준으로 상단 밴드와 하단 밴드가 결정됩니다.'
                        />
                        <SelectBox label='이동평균 (기준선)' options={avgLines}
                            placeholder='이동평균을 선택하세요' onChange={value => updateMomentumSettiongs({ baseMovingAvg: value })}
                            value={getMomentumSettings().baseMovingAvg}
                        />
                        <InputBox label='일수' value={getMomentumSettings().baseLinePeriod}
                            onChange={value => updateMomentumSettiongs({ baseLinePeriod: value })}
                            tip='1 - 20까지 입력할 수 있습니다.'
                            unit='일' placeholder='일수를 입력하세요'
                            handler={handleDaysChange}
                            handleBlur={() => {
                                if (getMomentumSettings().baseLinePeriod === '') {
                                    updateMomentumSettiongs({ baseLinePeriod: '1' });
                                }
                            }}
                        />
                    </div>
                    <div className='grid grid-cols-3 gap-7'>
                        <SelectBox label='경계선 (밴드)' options={bands}
                            placeholder='기준선을 선택하세요' onChange={value => updateMomentumSettiongs({ boundaryLine: value })}
                            value={getMomentumSettings().boundaryLine}
                            tooltip='기준선을 기반으로 가격과 변동성을 기반으로 계산된 수익곡선에 가중치를 부여하여 상/하단 밴드를 생성합니다.
경계선과 종가의 관계를 통해 상승 추세와 하락 추세를 판별하여 마켓타이밍 시그널을 생성합니다.'
                        />
                        <SelectBox label='이동평균 (경계선)' options={avgLines}
                            placeholder='기준선을 선택하세요' onChange={value => updateMomentumSettiongs({ boundaryMovingAvg: value })}
                            value={getMomentumSettings().boundaryMovingAvg}
                        />
                        <InputBox label='일수' value={getMomentumSettings().boundaryPeriod}
                            onChange={value => updateMomentumSettiongs({ boundaryPeriod: value })}
                            tip='10 ~ 60까지 입력할 수 있습니다.'
                            unit='일' placeholder='일수를 입력하세요'
                            handler={handleNumber}
                            handleBlur={() => {
                                if (getMomentumSettings().boundaryPeriod === '' || +getMomentumSettings().boundaryPeriod < 10 || +getMomentumSettings().boundaryPeriod > 60) {
                                    updateMomentumSettiongs({ boundaryPeriod: '20' });
                                }
                            }}
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-7'>
                        <InputBox label='진입 가중치' value={getMomentumSettings().entryWeight}
                            onChange={value => updateMomentumSettiongs({ entryWeight: value })}
                            tip='1 ~ 5까지 입력할 수 있습니다.'
                            placeholder='진입 가중치를 입력하세요'
                            handler={handleWeightChange}
                            handleBlur={() => {
                                if (getMomentumSettings().entryWeight === '' || +getMomentumSettings().entryWeight < 1.0 || +getMomentumSettings().entryWeight > 5.0) {
                                    updateMomentumSettiongs({ entryWeight: '1' });
                                } else {

                                    const formattedValue = parseFloat(getMomentumSettings().entryWeight).toFixed(2);
                                    updateMomentumSettiongs({ entryWeight: formattedValue });
                                }
                            }}
                            tooltip='높을수록 진입 기준이 높아져 매수 진입이 신중해지며 매매 횟수가 줄어들게 됩니다.
                                        다만 너무 큰 진입 가중치는 적절한 매수 타이밍을 놓칠 수 있습니다.
                                        반대로 낮을 시 진입 기준이 완화되어 쉽게 매수하게 되어 매매 횟수가 늘어나 매매 수수료 및 슬리피지로 인한 손실이 커질 수 있습니다.'
                        />
                        <InputBox label='청산 가중치' value={getMomentumSettings().liquidationWeight}
                            onChange={value => updateMomentumSettiongs({ liquidationWeight: value })}
                            tip='1 ~ 5까지 입력할 수 있습니다.'
                            placeholder='청산 가중치를 입력하세요'
                            handler={handleWeightChange}
                            handleBlur={() => {
                                if (getMomentumSettings().liquidationWeight === '' || +getMomentumSettings().liquidationWeight < 1.0 || +getMomentumSettings().liquidationWeight > 5.0) {
                                    updateMomentumSettiongs({ liquidationWeight: '3' });
                                } else {

                                    const formattedValue = parseFloat(getMomentumSettings().liquidationWeight).toFixed(2);
                                    updateMomentumSettiongs({ liquidationWeight: formattedValue });
                                }
                            }}
                            tooltip='높을수록 청산 기준이 높아져 매도가 신중해지며 매매 횟수가 줄어듭니다.
                                        다만 너무 큰 청산 가중치는 적절한 매도 타이밍을 놓칠 수 있습니다.
                                        반대로 낮을 시 청산 기준이 완화되어 매도가 쉬워지며 매매 횟수가 늘어나 매매 수수료 및 슬리피지로 인한 손실이 커질 수 있습니다.'

                        />

                    </div>
                </article>
            )}
        </article>
    )
}

export default Momentum