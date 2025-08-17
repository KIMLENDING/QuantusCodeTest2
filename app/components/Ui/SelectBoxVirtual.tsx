"use client";

import { useState, useRef, useEffect } from "react";
import { FixedSizeList as List } from 'react-window';
import RowData from "../market/RowData";
interface SelectBoxProps {
    label: string;
    placeholder?: string;
    options: string[];
    value?: string | null;
    onChange?: (value: string) => void;
}
const SelectBoxVirtual = ({ label, options, placeholder, value: selected, onChange }: SelectBoxProps) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // 바깥 클릭 시 닫힘 처리
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            // 바깥 클릭 시 닫힘 처리
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (item: string) => {
        setOpen(false);
        onChange?.(item);
    };

    return (
        <div className='flex flex-col gap-4 w-full relative' ref={containerRef}>


            <label htmlFor={label} className='label-1-normal-regular text-graycf'>{label}</label>
            <div className="relative w-full">
                <button id={label} className='w-full relative rounded-[6px] focus:ring-1' onClick={() => setOpen((prev) => !prev)}  >
                    <div className={`flex z-10  rounded-[6px] items-center justify-center h-[46px] border border-gray3b cursor-pointer hover:bg-[#3B3B3B]  `}>
                        <div className='h-[44px] text-white flex items-center justify-center label-1-normal-regular cursor-pointer text-center text-ellipsis overflow-hidden whitespace-nowrap label-1-normal-medium'>
                            <div className='text-white'>
                                {selected || placeholder}
                            </div>
                            <div className="absolute right-[12px] h-[48px] flex items-center ">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={` w-4 h-4 ${open ? 'rotate-270' : 'rotate-90'}`} vectorEffect="non-scaling-stroke">
                                    <path d="M8 20L16 12L8 4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </button>

                {/* 옵션 목록 */}
                {open && (
                    <div className="absolute max-h-[500px] top-[55px] left-0 w-full border border-gray3b rounded-[5px] p-2 shadow-lg z-10 bg-[#252525]  ">
                        <List
                            height={280}
                            itemCount={options.length}
                            itemSize={44}
                            width={780}
                        >
                            {({ index, style }) => (
                                <RowData
                                    item={options[index]}
                                    style={style}
                                    handleSelect={handleSelect}
                                />
                            )}
                        </List>
                    </div>
                )}
            </div>
        </div>
    );
}
export default SelectBoxVirtual;