import React from 'react'
interface ICheckedButtonProps {
  checked: boolean
}
export default function CheckButton({ checked }: ICheckedButtonProps) {
  return (
    <svg
      width='30px'
      height='30px'
      viewBox='0 0 24.00 24.00'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      stroke='#000000'
      strokeWidth='0.00024000000000000003'
    >
      <g
        id='SVGRepo_bgCarrier'
        strokeWidth='0'
        transform='translate(2.2799999999999994,2.2799999999999994), scale(0.81)'
      >
        <rect
          x='0'
          y='0'
          width='24.00'
          height='24.00'
          rx='12'
          fill={checked ? 'none' : '#0af56c'}
          strokeWidth='0'
        ></rect>
      </g>
      <g
        id='SVGRepo_tracerCarrier'
        strokeLinecap='round'
        strokeLinejoin='round'
      ></g>
      <g id='SVGRepo_iconCarrier'>
        {' '}
        <path
          d='M16.0303 10.0303C16.3232 9.73744 16.3232 9.26256 16.0303 8.96967C15.7374 8.67678 15.2626 8.67678 14.9697 8.96967L10.5 13.4393L9.03033 11.9697C8.73744 11.6768 8.26256 11.6768 7.96967 11.9697C7.67678 12.2626 7.67678 12.7374 7.96967 13.0303L9.96967 15.0303C10.2626 15.3232 10.7374 15.3232 11.0303 15.0303L16.0303 10.0303Z'
          fill='#1C274C'
        ></path>{' '}
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z'
          fill='#1C274C'
        ></path>{' '}
      </g>
    </svg>
  )
}
