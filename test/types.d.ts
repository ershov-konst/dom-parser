declare module 'dom-compare' {
  interface CompareResult {
    getResult: () => boolean;
  }

  class GroupingReporter {
    static report: (compareResult: CompareResult) => string;
  }

  function compareStrings(a: string, b: string): CompareResult;
}

declare namespace jest {
  interface Matchers<R> {
    toEqualDom(expected: string): R;
  }
}
