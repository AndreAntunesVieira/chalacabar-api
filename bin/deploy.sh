#!/usr/bin/env bash
tar -czf .build.tar.gz dist
echo "Use a senha: 19rcnking68"
echo "19rcnking68" | pbcopy
scp .build.tar.gz chalacabar@191.6.204.199:apps_nodejs/.build.tar.gz
ssh chalacabar@191.6.204.199 "\
cd apps_nodejs && \
tar -xzf .build.tar.gz && \
rm -rf api.rollback && \
mv api api.rollback && \
mv dist api && \
cd api && \
node dotenv-generator.js && \
rm dotenv-generator.js && \
npm i --only=prod --silent && \
pm2 restart api
"
