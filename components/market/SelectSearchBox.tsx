"use client";

import { useState, useRef, useEffect, } from "react";

import { FixedSizeList as List } from 'react-window';
import RowData from "./RowData";
import { useDebounce } from "@/hooks/useDebouncd";
interface SelectBoxProps {
    label: string;
    placeholder?: string;
    options: { word: string }[];
    onChange: (value: string) => void;
}

const SelectSearchBox = ({ label, options, placeholder, onChange }: SelectBoxProps) => {
    console.log('SelectSearchBox', label)
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState(options);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
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



    // 검색어가 변경될 때마다 디바운스된 값 사용
    useEffect(() => {
        if (!debouncedSearchTerm) { // 검색어가 비어있으면 원래의 옵션으로 되돌림
            setData(options);
            return;
        }
        const searchedData = options.filter((item) => (
            item.word.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        ));
        setData(searchedData);
    }, [debouncedSearchTerm, options]);


    const handleSelect = (item: string) => {
        setSelected(item);
        onChange(item);
        setOpen(false);
        setSearchTerm(''); // 선택 후 검색어 초기화
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };


    const isNoResult = searchTerm && data.length === 0;

    return (
        <div className='flex flex-col gap-4 w-full relative' ref={containerRef}>
            <label htmlFor="algorithm-select" className='label-1-normal-regular text-graycf'>{label}</label>
            <div className="relative w-full">
                <button id='algorithm-select' className='w-full relative rounded-[6px] focus:ring-1' onClick={() => setOpen((prev) => !prev)}>
                    <div className={`flex z-10 rounded-[6px] items-center justify-center h-[46px] border border-gray3b cursor-pointer hover:bg-[#3B3B3B]`}>
                        <div className='h-[44px] text-white flex items-center justify-center label-1-normal-regular cursor-pointer text-center text-ellipsis overflow-hidden whitespace-nowrap label-1-normal-medium'>
                            <div className='text-white'>
                                {selected || placeholder}
                            </div>
                            <div className="absolute right-[12px] h-[48px] flex items-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${open ? 'rotate-270' : 'rotate-90'}`} vectorEffect="non-scaling-stroke">
                                    <path d="M8 20L16 12L8 4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </button>

                {/* 옵션 목록 */}
                {open && (
                    <div>
                        <div className="rounded-t-md pl-5 absolute top-[55px] flex gap-3 
                            items-center bg-[#252525] text-gray-300 border border-gray3b hover:ring-1 
                            cursor-text h-[60px] min-h-[60px] w-full z-[3]  
                            focus-within:border-orange-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 20 20" fill="none">
                                <path d="M15.0271 13.8449L18.5963 17.4132L17.4171 18.5924L13.8488 15.0232C12.5211 16.0876 10.8696 16.6665 9.16797 16.6641C5.02797 16.6641 1.66797 13.3041 1.66797 9.16406C1.66797 5.02406 5.02797 1.66406 9.16797 1.66406C13.308 1.66406 16.668 5.02406 16.668 9.16406C16.6704 10.8657 16.0915 12.5172 15.0271 13.8449ZM13.3555 13.2266C14.4128 12.1388 15.0034 10.681 15.0013 9.16406C15.0013 5.94156 12.3905 3.33073 9.16797 3.33073C5.94547 3.33073 3.33464 5.94156 3.33464 9.16406C3.33464 12.3866 5.94547 14.9974 9.16797 14.9974C10.6849 14.9995 12.1427 14.4089 13.2305 13.3516L13.3555 13.2266Z" fill="white" />
                            </svg>
                            <input
                                className="flex flex-1 h-full bg-transparent border-none 
                                outline-none text-gray-300 text-base font-normal placeholder:text-gray-400"
                                placeholder="종목 검색 및 추가"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                autoFocus
                            />
                        </div>
                        <div className="absolute max-h-[300px] top-[111px] left-0 mt-1 w-full border border-gray3b rounded-b-[5px] border-t-0 z-[2]
                            p-2 shadow-lg  bg-[#252525] ">
                            {isNoResult ? (
                                <div className="text-gray-400 text-sm text-center">
                                    검색 결과가 없습니다.
                                </div>
                            ) : (
                                <List
                                    height={280}
                                    itemCount={data.length}
                                    itemSize={44}
                                    width={235}
                                >
                                    {({ index, style }) => (
                                        <RowData
                                            item={data[index]}
                                            style={style}
                                            selected={selected}
                                            handleSelect={handleSelect}
                                        />
                                    )}
                                </List>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default SelectSearchBox;