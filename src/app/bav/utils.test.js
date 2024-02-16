const { formatSortCodeForSubmission } = require("./utils");

describe("formatSortCodeForSubmission", () => {
  it("removes spaces from sort code", () => {
    expect(formatSortCodeForSubmission("12 34 56")).toBe("123456");
  });

  it("removes dashes from sort code", () => {
    expect(formatSortCodeForSubmission("12-34-56")).toBe("123456");
  });

  it("returns sort code with no spaces or dashes", () => {
    expect(formatSortCodeForSubmission("123456")).toBe("123456");
  });
});
