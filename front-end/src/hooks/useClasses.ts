import { useMemo } from "react";

interface ModuleClasses {
  styles: CSSModuleClasses
  classNames: (string|undefined)[]
}

interface IClassesArgs {
  classNames?: (string|undefined)[];
  moduleClasses?: ModuleClasses;
}

const useClasses = ({ classNames, moduleClasses }: IClassesArgs) => {
  classNames = classNames || [];
  moduleClasses = moduleClasses || { styles: {}, classNames: [] };
  return useMemo(() => {
    return [
      ...(classNames.filter(Boolean) as string[]),
      moduleClasses.classNames.filter(Boolean).map(className => moduleClasses.styles[className as string])
    ]
    .join(" ");
  },
    [classNames, moduleClasses]
  );
}

export default useClasses;
