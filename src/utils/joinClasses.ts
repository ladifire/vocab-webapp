export function joinClasses(className: string, ...args: string[]): string {
    let newClassName = className || '';
    const argLength = arguments.length;
  
    if (argLength > 1) {
      for (let index = 1; index < argLength; index++) {
        const nextClass = arguments[index];
        if (nextClass) {
          newClassName = (newClassName ? newClassName + ' ' : '') + nextClass;
        }
      }
    }
    return newClassName as string;
  }