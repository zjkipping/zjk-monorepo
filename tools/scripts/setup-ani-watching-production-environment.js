const aniListClientId = process.env.ANI_LIST_CLIENT_ID;

const fileContent = `import { AniListEnvironment } from '@zjk/ani-list/util-environment';

export const environment: AniListEnvironment = {
  aniListClientId: '${aniListClientId}',
};`;

const fs = require('fs');

fs.writeFileSync(
  'apps/ani-watching/src/environments/environment.production.ts',
  fileContent,
);
