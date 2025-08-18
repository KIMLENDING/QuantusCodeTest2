"use client"

import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { on } from "events"

interface DateOfPickerProps {
    onChange: (date: Date | undefined) => void
    label: string
    value: string
}

const DateOfPicker = ({ onChange, label, value }: DateOfPickerProps) => {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(undefined)

    return (
        <div className="flex flex-col gap-3 w-full">
            <Label htmlFor="date" className="px-1">
                {label}
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="justify-between font-normal w-full text-md border-[#353535] px-4 py-5"
                    >
                        <div className="w-1" />
                        {date ? date.toLocaleDateString() : "날짜를 선택하세요"}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className=" w-full overflow-hidden p-0" align="start">
                    <Calendar

                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            setDate(date)
                            setOpen(false)
                            onChange(date)
                        }}
                        fromYear={1960}
                        toYear={2060}

                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default DateOfPicker