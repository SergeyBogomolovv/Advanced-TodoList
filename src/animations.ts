import { Variants } from 'framer-motion'

export const columnAnimation: Variants = {
  visible: {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
  },
  hidden: {
    x: -100,
    scale: 0.5,
    opacity: 0,
  },
  exit: {
    y: 100,
    scale: 0.5,
    opacity: 0,
  },
}
export const deleteButtonAnimation: Variants = {
  visible: {
    x: 0,
    scale: 1,
    opacity: 1,
  },
  hidden: {
    x: -20,
    scale: 0.5,
    opacity: 0,
  },
  exit: {
    x: -20,
    scale: 0.5,
    opacity: 0,
  },
}
export const todoAnimation: Variants = {
  visible: {
    x: 0,
    scale: 1,
    opacity: 1,
  },
  hidden: {
    x: -100,
    scale: 0.5,
    opacity: 0,
  },
  exit: {
    x: 100,
    scale: 0.5,
    opacity: 0,
  },
}

export const bgAnimate: Variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
  },
}
export const modalAnimation: Variants = {
  visible: {
    rotate: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
  hidden: {
    scale: 0,
    rotate: 60,
  },
  exit: {
    scale: 0,
    rotate: 60,
  },
}
export const modalItemsAnimation: Variants = {
  visible: (i: number) => ({
    scale: 1,
    x: 0,
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.2 },
  }),
  hidden: {
    scale: 0.3,
    x: 100,
    y: 50,
    opacity: 0,
  },
}
export const addColumnModalAnimation: Variants = {
  visible: {
    rotate: 0,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
  hidden: {
    y: -200,
    scale: 0,
    rotate: 60,
  },
  exit: {
    y: 200,
    scale: 0,
    rotate: 60,
  },
}
