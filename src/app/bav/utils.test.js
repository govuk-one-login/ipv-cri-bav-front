const { formatSortCode, formatSortCodeForSubmission } = require("./utils");

describe("formatSortCode", () => {
  it("returns a sort code without dashes in the format XX-XX-XX", () => {
    expect(formatSortCode("123456")).toBe("12-34-56");
  });

  it("returns a sort code with spaces in the format XX-XX-XX", () => {
    expect(formatSortCode("12 34 56")).toBe("12-34-56");
  });
});

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
