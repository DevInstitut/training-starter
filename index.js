const cfg = require('./config');

const GitHub = require('github-api');
const gh = new GitHub({
    // variable d'environnement GITHUB_TOKEN à configurer dans Travis
    token: process.env.GITHUB_TOKEN
});

const genRepos = (gh, githubUser, repoName) => {
    console.log(`** création du dépôt : ${repoName}`);
    const orga = gh.getOrganization(githubUser);
    return orga.createRepo({name: repoName});
};


const promise$ = genRepos(gh, cfg.repoUser, cfg.repoName)
    .then ((data) => {
        console.log(data);
        require('./archetypes').push(cfg);
    }).catch(console.log);