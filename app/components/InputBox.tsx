'use client';

import React, { useState } from 'react'

interface InputBoxProps {
    label: string;
    placeholder: string;
    unit: string;
    tip: string;
    initialValue?: string;
    onChange?: (value: string) => void;

};
const InputBox = ({ label, placeholder, unit, tip, initialValue = '', onChange }: InputBoxProps) => {


    const handleInvestmentChange = (value: string) => {
        // 숫자만 허용
        const numericValue = value.replace(/\D/g, ''); // 숫자만 허용
        // 0으로 시작할 경우 제거
        const trimmedValue = numericValue.replace(/^0+/, '');
        // 9자리를 초과 할 경우 초기화
        if (trimmedValue.length > 9) {

            onChange?.('');
        } else {

            onChange?.(trimmedValue);
        }
    };

    const handlePercentageChange = (value: string) => {
        // 숫자만 허용
        if (!/^\d*$/.test(value)) return;
        // 0부터 100까지의 숫자만 허용
        const isValidPercentage = /^(100$|^[1-9]?\d)$/.test(value);
        // 0으로 시작할 경우 제거
        if (value.length > 1 && value.startsWith("0")) {
            value = value.replace(/^0+/, "");

            return onChange?.(value);
        }
        if (!isValidPercentage) {

            onChange?.('');
        } else {

            onChange?.(value);
        }
    };

    return (
        <div className='w-full flex flex-col'>
            <div className='flex flex-col gap-4 w-full' >
                <label htmlFor={label} className='label-1-normal-regular text-graycf'>{label}</label>
                <div className='flex relative w-full h-[46px] '>
                    <input id={label} type="text" autoComplete='off'
                        className='w-full bg-transparent border text-center 
                    rounded-[6px] outline-none label-1-normal-medium py-3 text-white border-gray3b
                    focus:ring-1  placeholder:text-gray8f cursor-text'
                        value={initialValue} onChange={(e) => {
                            if (unit === '%') {
                                handlePercentageChange(e.target.value);
                            } else {
                                handleInvestmentChange(e.target.value);
                            }
                        }} placeholder={placeholder} />
                    <div className='absolute right-6 top-1/2 -translate-y-1/2 text-gray8f label-1-normal-medium '>{unit}</div>
                </div>
            </div>
            <span className="caption-1-regular mt-3 text-gray9f">{tip}</span>
        </div>
    )
}

export default InputBox