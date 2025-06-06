interface KeyValuePair {
  key: string;
  value: string;
}

interface FinalResultObject {
  [key: string]: string | KeyValuePair[] | Record<string, string>;
}

type ExtractionResult =
  | { success: true; result: FinalResultObject }
  | { success: false; result: string };

const IGNORED_TOP_LEVEL_KEYS: string[] = [
  "User ID & Name",
  "Machine Name",
  "Input XML File Path",
];

const ERROR_LIST_KEYS: string[] = [
  "List of errors",
  "List of warnings",
  "List of exceptions",
  "List of Exceptions",
];

export const extractData_spix_ts = (
  arr: string[],
  nodi: boolean = false
): ExtractionResult => {
  try {
    const finalObj: FinalResultObject = {};
    let ifError: string | null = null;

    for (let ele of arr) {
      ele = ele.replace(/\s+/g, " ").trim();

      if (ele.includes(":")) {
        ele = ele.replace("#", "");
        const splitted: string[] = ele.split(":");
        const trimmedParts: string[] = splitted.map((e) => e.trim());

        const currentName: string = trimmedParts[0];
        const currentValue: string = trimmedParts.slice(1).join(":");

        const obj = { name: currentName, value: currentValue };

        if (IGNORED_TOP_LEVEL_KEYS.includes(obj.name)) {
          continue;
        }

        if (ifError) {
          if (!ERROR_LIST_KEYS.includes(obj.name) && obj.name.trim() !== "") {
            if (nodi) {
              if (!Array.isArray(finalObj[ifError])) {
                finalObj[ifError] = [];
              }
              (finalObj[ifError] as KeyValuePair[]).push({
                key: obj.name,
                value: obj.value,
              });
            } else {
              if (obj.value !== "") {
                if (
                  typeof finalObj[ifError] !== "object" ||
                  Array.isArray(finalObj[ifError])
                ) {
                  finalObj[ifError] = {};
                }
                (finalObj[ifError] as Record<string, string>)[obj.name] =
                  obj.value;
              }
            }
          } else {
            ifError = null;
            if (ERROR_LIST_KEYS.includes(obj.name)) {
              ifError = obj.name;
              if (nodi) {
                finalObj[obj.name] = [] as KeyValuePair[];
              } else {
                finalObj[obj.name] = {} as Record<string, string>;
              }
            }
          }
        } else if (ERROR_LIST_KEYS.includes(obj.name)) {
          ifError = obj.name;
          if (nodi) {
            finalObj[obj.name] = [] as KeyValuePair[];
          } else {
            finalObj[obj.name] = {} as Record<string, string>;
          }
        } else {
          if (obj.value !== "") {
            finalObj[obj.name] = obj.value;
          }
        }
      }
    }

    return { success: true, result: finalObj };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return { success: false, result: errorMessage };
  }
};

export const extractData_parser = (arr: string[]): string[] => {
  const final: string[] = [];

  for (const ele of arr) {
    if (ele.trim() !== "") {
      final.push(ele);
    }
  }

  return final;
};
