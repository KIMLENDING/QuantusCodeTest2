'use client';

import React from 'react'
import TooltipComponent from './TooltipComponent';

interface InputBoxProps {
    label: string;
    placeholder: string;
    tip: string;
    unit?: string;
    tooltip?: string;
    value?: string;
    onChange: (value: string) => void;
    handler: (value: string, onChange: (v: string) => void) => void;
    handleBlur?: () => void;
};
const InputBox = ({ label, placeholder, unit, tip, tooltip, value, onChange, handler, handleBlur }: InputBoxProps) => {
    const handleChange = (value: string) => {
        handler?.(value, onChange);
    }


    return (
        <div className='w-full flex flex-col'>
            <div className='flex flex-col gap-4 w-full' >
                <div className='flex flex-row gap-2'>
                    <label htmlFor={label} className='label-1-normal-regular text-graycf'>{label}</label>
                    {tooltip && (<TooltipComponent id={label} content={tooltip} />)}
                </div>
                <div className='flex relative w-full h-[46px] '>
                    <input id={label} type="text" autoComplete='off'
                        className='w-full bg-transparent border text-center 
                    rounded-[6px] outline-none label-1-normal-medium py-3 text-white border-gray3b
                    focus:ring-1  placeholder:text-gray8f cursor-text'
                        value={value} onChange={(e) => handleChange(e.target.value)}
                        placeholder={placeholder} onBlur={handleBlur} />
                    <div className='absolute right-6 top-1/2 -translate-y-1/2 text-gray8f label-1-normal-medium '>{unit}</div>
                </div>
            </div>
            <span className="caption-1-regular mt-3 text-gray9f">{tip}</span>
        </div>
    )
}

export default InputBox