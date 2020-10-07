import ghpages from 'gh-pages';

const publishConfig = {
  repo: 'https://github.com/liveahero-community/liveahero-community.github.io',
  branch: 'web',
  dest: '.',
};

ghpages.publish('build', publishConfig, (err) => {
  console.error(err);
});
