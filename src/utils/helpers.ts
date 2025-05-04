export const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

export function mockPromise(ok:boolean, msg: string, timeout: number = 500): Promise<any> {
  return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ok, msg})
      }, timeout)
    }
  )
}


