/* eslint-disable @typescript-eslint/ban-types */

export async function delay(n: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, n);
  });
}
type Methods<T> = {
  [key in keyof T]: T[key] extends Function ? key : never;
}[keyof T];
type MethodsAndProperties<T> = {
  [key in keyof T]: T[key];
};
export type Properties<T> = Omit<MethodsAndProperties<T>, Methods<T>>;
