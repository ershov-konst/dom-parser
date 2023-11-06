import { compareStrings, GroupingReporter as compareReporter } from 'dom-compare';

expect.extend({
  toEqualDom(received: string, expected: string) {
    const compareResult = compareStrings(received, expected);
    const pass = compareResult.getResult();

    if (pass) {
      return {
        message: () => 'Dom matched',
        pass,
      };
    }

    return {
      message: () => compareReporter.report(compareResult),
      pass,
    };
  },
});

export default function globalSetup() {
  // DO NOTHING
}
