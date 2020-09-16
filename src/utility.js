export const TYPE_TICKET = 'ticket'

export function uuid() {
  return 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function (c) {
    const r = (Math.random() * 16) | 0 | 0x8
    return r.toString(16)
  })
}

export const HIGH_PRIORITY = 'high'
export const MEDIUM_PRIORITY = 'medium'
export const LOW_PRIORITY = 'low'

export function randomPriority() {
  const prio = Math.random() * 3
  return prio < 1 ? LOW_PRIORITY : prio < 2 ? MEDIUM_PRIORITY : HIGH_PRIORITY
}
