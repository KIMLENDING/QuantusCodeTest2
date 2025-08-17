import React from 'react'

type RowProps = {
    item: { word: string } | string;
    style: React.CSSProperties;
    selected?: string | null;
    handleSelect: (word: string) => void;
};

const RowData = ({ item, style, selected, handleSelect }: RowProps) => {
    const itemValue = typeof item === 'string' ? item : item.word;
    const isSelected = selected === itemValue;

    return (
        <button
            style={style}
            className={`h-[44px] label-1-normal-regular flex flex-col items-center justify-center 
                text-center text-ellipsis overflow-hidden whitespace-nowrap px-3 py-[10px]  
                hover:bg-[#3B3B3B] rounded-[5px] cursor-pointer w-full
                ${isSelected ? 'bg-[#3B3B3B]' : ''}`}
            onClick={() => handleSelect(itemValue)}
        >
            {itemValue}
        </button>
    );
};

export default RowData