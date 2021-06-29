// All avaliable repository hub types
const HUB_TYPES = {
  git: 'github',
  bit: 'bitbucket'
};

/**
 * handles shortening title of the pull request if it's more than 30 characters long
 * @param {string} title - pull request's title
 * @returns {string} formated pull reuest's title
 */
export const formatPullRequestTitle = title =>
  title.length >= 30 ? `${title.substring(0, 40).trim()}...` : title;

/**
 * handles formatting response from API to proper pull request array
 * @param {String} repositoryHubType - type of repository hub
 * @param {Object[]} pullRequests - array of pull requests from API Call
 * @returns {Object[]} array of pull request objects containing id, title and url
 */
export const preparePullRequestArray = (repositoryHubType, pullRequests) => {
  if (!pullRequests) return;

  switch (repositoryHubType) {
    case HUB_TYPES.git:
      pullRequests = pullRequests.map(pr => ({
        id: pr.id,
        title: pr.title,
        url: pr.html_url
      }));
      break;
    case HUB_TYPES.bit:
      pullRequests = pullRequests.map(pr => ({
        id: pr.id,
        title: pr.title,
        url: pr.links.html ? pr.links.html.href : pr.links.self[0].href
      }));
      break;
    default:
      return pullRequests;
  }

  return pullRequests;
};
