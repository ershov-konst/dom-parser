declare module 'dom-compare' {
  interface CompareResult {
    getResult: () => boolean;
  }

  interface GroupingReporter {
    report: (compareResult: CompareResult) => string;
  }

  function compareStrings(a: string, b: string): CompareResult;
}
