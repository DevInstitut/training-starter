const sh = require('shelljs');
const replace = require("replace");
const REPO_TEMP_DIR = 'target';
const lg = console.log;


const push = (config) => {

    const PUSH_URL = `git@github.com:${config.repoUser}/${config.repoName}`

    lg(`** Génération archetype ${archetypeName} pour le dépôt ${config.repoUser}/${config.repoName}` );

    sh.rm('-rf', REPO_TEMP_DIR);

    const repoDir = `${REPO_TEMP_DIR}/${config.repoName}`;

    sh.mkdir('-p', repoDir);

    lg(`** Copie des sources de l'archetype vers ${repoDir}`);

    sh.cp('-R', `archetype/*`, repoDir);

    lg('** Mise à jour du projet');

    replace({
        regex: "____TITRE_FORMATION___",
        replacement: config.title,
        paths: [`${repoDir}/book.json`],
        recursive: true,
        silent: true,
    });

    replace({
        regex: "____REPO___",
        replacement: `${config.repoUser}/${config.repoName}`,
        paths: [`${repoDir}/book.json`],
        recursive: true,
        silent: true,
    });

    replace({
        regex: "____TITRE_FORMATION___",
        replacement: config.title,
        paths: [`${repoDir}/README.md`],
        recursive: true,
        silent: true,
    });

    replace({
        regex: "____REPO___",
        replacement: repoName,
        paths: [`${repoDir}/README.md`],
        recursive: true,
        silent: true,
    });

    replace({
        regex: "____USER___",
        replacement: config.repoUser,
        paths: [`${repoDir}/README.md`],
        recursive: true,
        silent: true,
    });

    replace({
        regex: "____CONTEXT___",
        replacement: config.context,
        paths: [`${repoDir}/README.md`],
        recursive: true,
        silent: true,
    });

    lg(`** Commit & Push Github`);
    const gitCmds = [
        `cd ${repoDir} && git init`,
        `cd ${repoDir} && git add .`,
        `cd ${repoDir} && git commit -m "init archetype"`,
        `cd ${repoDir} && git push --force ${PUSH_URL} master`];

    gitCmds.forEach(sh.exec);
};


exports.push = push;