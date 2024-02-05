function formatSortCodeForSubmission(sortCode) {
  return sortCode.replace(/[ -]/g, "");
}

module.exports = { formatSortCodeForSubmission };
