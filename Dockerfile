FROM node:current-alpine
WORKDIR /xthru
COPY package.json /xthru
COPY index.ts /xthru

# Patch for Puppeteer not working on Alpine... 🤷‍♂️

RUN apk --no-cache add bash g++ gcc py-pip libgcc make chromium    
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN yarn install
EXPOSE 2020

CMD [ "yarn", "dev" ]