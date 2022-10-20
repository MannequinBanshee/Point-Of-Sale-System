FROM archlinux as base

WORKDIR /app

COPY . .
RUN rm -rf node_modules

RUN pacman -Syu --noconfirm
RUN pacman -Sy base-devel cairo pango libjpeg-turbo giflib libsvgtiny python3 nodejs yarn librsvg --noconfirm

RUN rm -rf node_modules
RUN yarn global add node-gyp
RUN yarn add canvas --build-from-source
RUN yarn add nodemon jsbarcode
RUN yarn install --frozen-lockfile
RUN yarn cache clean

CMD ["node", "app.js"]