'use client'
import React, { useState } from 'react';
import { menu } from '@/lib/contents/exData';
import { useRouter } from 'next/navigation';

const Header = () => {
    const [showDropdown, setShowDropdown] = useState<string | null>(null);
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
    const route = useRouter();

    return (
        <header className="sticky top-0 bg-[#151515] text-white flex items-center justify-between w-full flex-shrink-0 h-headerHeight gap-[60px] z-[5000]">
            <div className="mx-auto max-w-[1280px] w-full flex items-center justify-between">
                <nav className='flex items-center flex-shrink-0'>
                    <a href="/" className='pb-2'>
                        <img src="/quantusLogo.svg" alt="logo" width={120} height={26} loading="lazy" className='bg-transparent' />
                    </a>
                    <div className='w-[50px] flex-shrink-0'></div>
                    <ul className="flex items-center gap-[40px] flex-grow">
                        {menu.map((menuItem, index) => (
                            <li
                                key={menuItem.title}
                                data-is-active={index === 0}
                                className={`relative cursor-pointer flex-shrink-0 headline1 font-medium group  header-link ${index === 0 ? 'text-white' : 'text-gray8f'}`}
                                onMouseEnter={() => setShowDropdown(menuItem.title)}
                                onMouseLeave={() => setShowDropdown(null)}
                            >
                                <div className="flex items-center gap-[6px] group-hover:text-white">
                                    <span>{menuItem.title}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5" fill="none" className={`transition-transform duration-200 group-hover:rotate-180  gray8f ${index === 0 ? 'rotate-180' : ''}`}>
                                        <path fillRule="evenodd" clipRule="evenodd" fill="currentColor" d="M0.215704 5C0.0163303 5 -0.0634192 4.74895 0.056205 4.58159L3.56518 0.188285C3.76456 -0.0627615 4.12343 -0.0627615 4.3228 0.188285L7.9514 4.58159C8.07103 4.74895 7.9514 5 7.7919 5H0.215704Z">
                                        </path>
                                    </svg>
                                </div>
                                <section>
                                    <div className="absolute top-[25px] left-1/2 -translate-x-1/2 w-[45px] h-[20px] bg-transparent z-[4999]" />
                                    {showDropdown === menuItem.title && (
                                        <div className="absolute top-[37px] left-1/2 -translate-x-1/2 bg-gray1e shadow-lg w-[258px] border border-gray25 p-3 z-[5000] h-[250px] rounded-lg">
                                            <p className="caption-1-medium p-3 text-white">{menuItem.title}</p>
                                            <ul>
                                                {menuItem.items.map((subItem, subIndex) => (
                                                    <li
                                                        key={subItem.title}

                                                        onMouseEnter={() => {
                                                            setShowDropdown(menuItem.title);
                                                            setActiveSubmenu(subItem.title)
                                                        }}
                                                        onMouseLeave={() => {
                                                            setShowDropdown(null);
                                                            setActiveSubmenu(null)
                                                        }}
                                                    >

                                                        <div className="relative hover:bg-zinc-800 rounded-md transition-colors cursor-pointer flex items-center justify-between px-3 py-2"
                                                        >
                                                            <section>
                                                                <div className="body-1-normal-medium text-white">{subItem.title}</div>
                                                                <div className="flex-shrink-0 h-1"></div>
                                                                <div className="caption-1-regular text-gray8f">{subItem.description}</div>
                                                            </section>

                                                            {subItem.items.length > 0 &&

                                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray8f -rotate-90">
                                                                    <path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            }
                                                            <div className="absolute right-0 translate-x-1/2  w-[45px] h-[70px]  z-[4999]  bg-transparent" />
                                                        </div>
                                                        {activeSubmenu === subItem.title && subItem.items.length > 0 && (
                                                            <div className="absolute left-full top-[-1px] bg-gray25 rounded-tr-lg rounded-br-lg shadow-lg w-[250px] border-t border-r border-b border-gray25 p-3 h-[250px] z-[5000] block">
                                                                <p className="caption-1-medium p-3 text-white">{subItem.title}</p>

                                                                <ul>
                                                                    {subItem.items.map((subSubItem) => (
                                                                        <li key={subSubItem.title}>
                                                                            <div className="hover:bg-zinc-700  rounded-md transition-colors cursor-pointer px-3 py-2"
                                                                                onClick={() => route.push(subSubItem.link)}
                                                                            >
                                                                                <div className="body-1-normal-medium text-white">{subSubItem.title}</div>
                                                                                <div className="flex-shrink-0 h-1"></div>
                                                                                <div className="caption-1-regular text-gray8f">{subSubItem.description}</div>
                                                                            </div>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </section>
                            </li>
                        ))}


                        <li data-is-active="false" className="relative cursor-pointer flex-shrink-0 text-gray8f headline1 font-medium group hover:text-white header-link">
                            <div className="block py-2">사용권 구매</div>
                        </li>

                    </ul>
                    <img alt="lang" loading="lazy" width="54" height="34" decoding="async"
                        data-nimg="1" className="ml-10 cursor-pointer bg-transparent"
                        src="/vip.png" ></img>
                </nav>
                <div className="flex items-center gap-5">
                    <button type="button" className="justify-center p-3 text-gray15  
                    font-bold bg-white text-sm flex items-center w-[77px] h-[32px] rounded-md">
                        로그인
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
