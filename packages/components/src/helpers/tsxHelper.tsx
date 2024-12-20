import { isFunction } from "@phil/utils";
import { Slots } from "vue";

export function getSlot(slots: Slots, slot = 'default', data?: any, opts?: any) {
  if (!slots || !Reflect.has(slots, slot)) {
    return null;
  }
  if (!isFunction(slots[slot])) {
    console.error(`${slot} is not a function!`);
    return null;
  }
  const slotFn = slots[slot];
  if (!slotFn) return null;
  const params = { ...data, ...opts };
  return slotFn(params);
}