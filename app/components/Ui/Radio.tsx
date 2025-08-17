import React from 'react';
import TooltipComponent from './TooltipComponent';

interface RadioProps {
    label: string;
    options: { label: string; tooltip: string }[];
    value: 'SMA' | 'EMA' | 'HMA';
    onChange: (value: 'SMA' | 'EMA' | 'HMA') => void;
    direction?: 'row' | 'column'; // 라디오 버튼 나열 방향
}

const Radio = ({ label, options, value, onChange, direction = 'row' }: RadioProps) => {
    return (
        <div>

            <label className='label-1-normal-regular text-graycf'>{label}</label>
            <div className='flex-shrink-0 h-[20px]' />
            <div className={`flex ${direction === 'row' ? 'flex-row gap-24' : 'flex-col gap-2'}`}>
                {options.map((option) => (
                    <label key={option.label} className="flex items-center cursor-pointer gap-2">
                        <input
                            type="radio"
                            name={option.label}
                            value={option.label}
                            checked={value === option.label}
                            onChange={() => onChange(option.label as 'SMA' | 'EMA' | 'HMA')}
                            className="accent-[#4C4C4C] w-4 h-4"
                        />
                        <div className='flex flex-row gap-1'>
                            <span className="text-white text-sm">{option.label}</span>
                            <TooltipComponent id={`tooltip-${option.label}`} content={option.tooltip} />
                        </div>
                    </label>
                ))}
            </div>
        </div >
    );
};

export default Radio;
