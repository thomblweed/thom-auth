FROM denoland/deno:1.18.2

EXPOSE 3001

WORKDIR /app

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
COPY deps.ts .
RUN deno cache --unstable deps.ts

ADD . .

RUN deno cache --unstable app.ts

CMD ["deno", "run", "--allow-net", "--allow-read", "--allow-env", "--unstable", "app.ts"]
