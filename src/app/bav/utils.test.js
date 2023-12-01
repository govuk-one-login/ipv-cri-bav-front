const { formatSortCode } = require("./utils")

describe("formatSortCode", () => {
  it("returns a sort code without dashes in the format XX-XX-XX", () => {
    expect(formatSortCode("123456")).toBe("12-34-56")
  })
  
  it("returns a sort code with spaces in the format XX-XX-XX", () => {
    expect(formatSortCode("12 34 56")).toBe("12-34-56")
  })
})