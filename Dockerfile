FROM archlinux as base

WORKDIR /app

COPY package.json yarn.lock ./

RUN pacman -Syu --noconfirm
RUN pacman -Sy base-devel cairo pango libjpeg-turbo giflib libsvgtiny python3 nodejs yarn librsvg --noconfirm

RUN rm -rf node_modules
RUN yarn global add node-gyp
RUN yarn install --frozen-lockfile
RUN yarn cache clean

COPY . .

CMD ["node", "app.js"]